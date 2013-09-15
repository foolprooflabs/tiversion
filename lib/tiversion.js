var path = require('path'),
    fs = require('fs'),
    xml2js = require("xml2js"), 
    _ = require("underscore"),
    parser = new xml2js.Parser(),
    sys = require("sys"),
    exec = require("child_process").exec;

function findTiApp(p, callback) {
  if (path.dirname(p) === p) {
    callback("Not Found", null);
  } else if (fs.existsSync(path.join(p, 'tiapp.xml'))) {
    callback(null, p);
  } else {
    findTiApp(path.dirname(p),callback);
  }
}
function walk(p, callback) {
  findTiApp(p, function(err, tpath) {
    if (err) callback(err, null);
    else {
      fs.readFile(path.join(tpath,'tiapp.xml'), function(err, data) {
        if (err) walk(path.dirname(tpath), callback);
        else {
          parser.parseString(data, function (err, result) {
            if (err || !result['ti:app']['sdk-version']) walk(path.dirname(tpath), callback);
            else {
              callback(null, {path: p, current: result['ti:app']['sdk-version'].toString()});
            }
          });
        }
      });
    }
  });
}
exports.getCurrentVersion = walk;

exports.list = function(p, callback) {
  function puts(error, stdout, stderr) {
    if (error || stderr) {
      callback(error || stderr, null);
    }
    var sdk_result = JSON.parse(stdout); 
    
    walk(p, function(err, result) {
      var ret = {
        versions:_.keys(sdk_result.installed)
      };
      if (result) {
        _.extend(ret, result);
      }
      callback(null, ret);
    });
  }
  exec("titanium sdk list --no-banner --output json", puts);
};

