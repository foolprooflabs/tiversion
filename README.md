tiversion
=========

Handy Titanium SDK version commands

Install
-------

```
sudo npm install -g tiversion
```


CLI Commamnds
-------------

### tiversion

Returns the ti sdk version of the current project.

Can be used, e.g. with zsh so the version is in the prompt.

For example:

![screenshot](http://github.com/dbankier/tiversion/raw/master/screenshots/zsh.png)

To add to zsh, e.g. add the following to your PROMPT:

```
$fg[cyan] $(echo `tiversion`)
```
(See my [dotfiles](https://github.com/dbankier/dotfiles) repo if you want my full zsh theme.)

### tiversion set

Can be used to set the sdk version of the current app.

**NOTE** requires the titnanium cli to be installed (`sudo npm install -g titanium`)

![screenshot](http://github.com/dbankier/tiversion/raw/master/screenshots/set.png)


Public API
----------

### getCurrentVersion

`getCurrentVersion(path, callback);`

* `path` to begin search for tiapp.xml
* `callback` returns to arguments
  1. `err` - error message
  2. `res` - object with:
    `current` - current version used in the app
    `path` - path where `tiapp.xml` was found

### list

`list(path, callback);`

* `path` to begin search for tiapp.xml
* `callback` returns to arguments
  1. `err` - error message
  2. `res` - object with:
    `current` - current version used in the app
    `path` - path where `tiapp.xml` was found
    `versions` - titanium sdk versions installed


