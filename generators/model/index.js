'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var fileExists = require('file-exists');
var globalJs = require('../global.js');



module.exports = yeoman.Base.extend({
	prompting: function () {

		// Have Yeoman greet the user.
		this.argument('model_string', { type: String, required: true }); 
		this.log(chalk.magenta('Class Name: '+this.model_string))
		

		if(this.model_string.includes(":")){
			this.log(chalk.red('Class Name Missing'));
			process.exit(1);		
		}else{
			this.data  = this.argument().arguments.splice(1);
		}

	},writing:function(){
		if(fileExists('andrils.json')){
			var obj = JSON.parse(this.fs.read('andrils.json', 'utf8'));
			mkdirp('andrils_config/model/');
			var model={
				class:this.model_string,
				vars:this.data	

			}

			this.fs.write('andrils_config/model/'+this.model_string+'.json', JSON.stringify(model, null, 4), function(err) {
				if(err) {
					console.log(err);
				} else {
					console.log("JSON saved to " + outputFilename);
				}
			}); 

			this.log(chalk.magenta('Application Name: '+obj.appName));
		}else{
			this.log(yosay('YO! we cannot find your' + chalk.red (' root project.')));
			this.log(chalk.yellow('Try run yo andrils or try run yo andrils:model in your root project which have andrils.json'));

		}
	},
	generate:function(){
		

	},


	install: function () {
		this.installDependencies();
	}
});
