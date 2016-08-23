'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fileExists = require('file-exists');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.argument('model_string', { type: String, required: true }); 
    this.log(this.model_string);
  },writing:function(){
    if(fileExists('/andrils.json')){
    var obj = JSON.parse(this.fs.read('andrils.json', 'utf8'));
    
    this.log(obj.appName);
	}else{
	this.log(yosay('YO! we cannot find your' + chalk.red (' root project.')));
	this.log(chalk.yellow('Try run yo andrils or try run yo andrils:model in your root project which have andrils.json'));
	}
  },


  install: function () {
    this.installDependencies();
  }
});
