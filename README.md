tiversion
=========

A simple script that returns the titanium version of the project in the current directory.

Can be used, e.g. with zsh so the version is in the prompt.

For example:

![screenshot](http://github.com/dbankier/tiversion/raw/master/zsh.png)

Install
-------

```
sudo npm install -g tiversion
```

To add to zsh, e.g. add the following to your PROMPT:
```
$fg[cyan] $(echo "("`tiversion`")")
```

(See my [dotfiles](https://github.com/dbankier/dotfiles) repo if you want my full zsh theme.)

