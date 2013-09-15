var path = require('path'),
    fs = require('fs'),
    xml2js = require("xml2js"), 
    _ = require("underscore"),
    parser = new xml2js.Parser(),
    sys = require("sys"),
    tiapp = require("tiapp"),
    exec = require("child_process").exec;

function walk(p, callback) {
  tiapp.find(p, function(err, result) {
    if (err) callback(err, null);
    else {
      if (err || !result.obj['ti:app']['sdk-version']) walk(path.dirname(resul.path), callback);
      else {
        callback(null, {path: result.path,  current: result.obj['ti:app']['sdk-version'].toString()});
      }
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

