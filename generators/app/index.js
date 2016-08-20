'us strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
	prompting: function () {
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the swell ' + chalk.red('generator-andrils') + ' generator!'
		));

		var prompts = [{
			type: 'confirm',
			name: 'someAnswer',
			message: 'Would you like to enable this option?',
			default: true
		}];

		return this.prompt(prompts).then(function (props) {
			// To access props later use this.props.someAnswer;
			this.props = props;
		}.bind(this));
	},

	ask_packageName:function(){

		return this.prompt([{
			type: 'input',
			name: 'appname',
			message: 'Enter the application name',
			default: 'andrils'

		}]).then(function(props){
			this.appname = props.appname;
		}.bind(this));
	},
	ask_companyDomain:function(){
	
	return this.prompt([{
		type: 'input',
		name: 'domain',
		message:'Enter the company domain Name',
		default: 'andrils'
	}]).then(function(props){
		this.domain =	 props.domain + ".com";
		this.packagename = "com."+props.domain+"."+this.appname;
	}.bind(this));
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
	},

	install: function () {
		this.installDependencies();
	}
});
