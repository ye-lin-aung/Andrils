'us strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');



module.exports = yeoman.Base.extend({


	prompting:function(){
		this.log(yosay('Welcome to the swell'+ chalk.red('generator-andrils')+'generator!'));
		const prompts =[{
			type: 'input',
			name: 'pack_name',
			store: true,
			message: 'Enter the application name',
			default: 'andrils',
			validate: function (input) {
				if (/^([a-zA-Z0-9_]*)$/.test(input)) {
					return true;
				}
				return 'Your application name cannot contain special characters or a blank space, using the default name instead : ' + this.appname;
			}
		},{
			type: 'input',
			name: 'domain',
			store:true,
			message:'Enter the company domain Name',
			default: 'andrils'

		}];

		return this.prompt(prompts).then(props=>{
			this.pack_name = props.pack_name	
			this.domain = props.domain
			this.packagename = "com."+props.domain+"."+this.pack_name;
		});

		
		

		
	},
	
	git_init:function(){

		this.spawnCommandSync('git',['init']);
		this.log(chalk.yellow('Application Name:')+this.appname);
		this.log(chalk.yellow('Company Domain:')+this.domain);
		this.log(chalk.yellow('Package Name:')+this.packagename);


	},

	writing: function () {

		this.fs.copy(
			this.templatePath('Andrils/'),
			this.destinationPath('android/'+this.appname)

			);
		this.fs.copyTpl(this.templatePath('init/AndroidManifest.xml'),
			this.destinationPath('android/'+this.appname+'/app/src/main/AndroidManifest.xml'),
			{pack_name:this.packagename});
	},

	making_file:function(){
		var file_path = 'android/'+this.appname+'/app/src/main/java/' ;
		var absolute_path = file_path+this.packagename.split('.')[0]+'/'+this.packagename.split('.')[1]+'/'+this.packagename.split('.')[2];

		mkdirp(absolute_path,function(err){
			if(err){
				this.log(err);
			}else{	

			}});


		this.fs.copyTpl(
			this.templatePath('init/MainActivity.java'),
			this.destinationPath(absolute_path+'/MainActivity.java'),
			{ pack_name: this.packagename }
			);


	},





	install: function () {
		this.installDependencies();
	}
});
