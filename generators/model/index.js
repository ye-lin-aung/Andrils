'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var fileExists = require('file-exists');
var globalJs = require('../global.js');
var path = require('path');


var dir;
module.exports = yeoman.Base.extend({
	prompting: function () {

		// Have Yeoman greet the user.
		this.argument('model_string', { type: String, required: true }); 
		this.option('reset');
    // And you can then access it later on this way; e.g.
    this.scriptSuffix = (this.options.reset ? "yes": "no");

    this.log(this.scriptSuffix);
    if(this.model_string.includes(":")){
    	this.log(chalk.red('Class Name Missing'));
    	process.exit(1);		
    }else{
    	this.data  = this.argument().arguments.splice(1);
    }

},processing:function(){
	this.data = globalJs.processDataTypes(this.data);

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
		this.appName = obj.appName;
		this.packageName = obj.packageName;
		var tempPack = obj.packageName.split('.');
		this.dir = tempPack[0]+'/'+tempPack[1]+'/'+tempPack[2];

		this.log(yosay('YO! your Model Name is ' + chalk.blue (this.model_string+'.class')));
		this.log(chalk.magenta('Application Name: '+obj.appName));
		this.log(chalk.magenta('Model Name: '+this.model_string));
		
		this.modelFiles = globalJs.getFiles('andrils_config/model');



		if(this.scriptSuffix == "yes"){


			for (var i = this.modelFiles.length - 1; i >= 0; i--) {

				if( path.extname(this.modelFiles[i]) == '.json'){
					var obj = JSON.parse(this.fs.read(this.modelFiles[i], 'utf8'));
					this.objects = obj.vars;
					this.var_names = Object.keys(obj.vars);
					this.vars = globalJs.values(obj.vars);
					this.className = obj.class;
					this.pack_name = this.packageName;

					this.template('model/Model.java','app/src/main/java/'+this.dir+'/model/'+this.className+'.java');

				}

			}

		}else{

			if( path.extname('andrils_config/model/'+this.model_string+'.json') == '.json'){
				var obj = JSON.parse(this.fs.read('andrils_config/model/'+this.model_string+'.json', 'utf8'));
				this.objects = obj.vars;
				this.var_names = Object.keys(obj.vars);
				this.vars = globalJs.values(obj.vars);
				this.className = obj.class;
				this.pack_name = this.packageName;
				
				this.template('model/Model.java','app/src/main/java/'+this.dir+'/model/'+this.className+'.java');
			}





		}

	}else{
		this.log(yosay('YO! we cannot find your' + chalk.red (' root project.')));
		this.log(chalk.yellow('Try run yo andrils or try run yo andrils:model in your root project which have andrils.json'));

	}},
generate:function(){





},


install: function () {
	this.installDependencies();
}
});
