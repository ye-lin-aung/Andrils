'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');




module.exports = yeoman.Base.extend({


	prompting:function(){
		this.log(yosay('Welcome from '+ chalk.red('generator-andrils')+'!'));
		const prompts =[{
			type: 'input',
			name: 'appname',
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

		},
		{	
			name: 'targetSdk',
			message: 'What Android SDK will you be targeting?',
			store: true,
       		default: 23  // Android 6.0 (Marshmallow)
    	},
   		{
    	name: 'minSdk',
    	message: 'What is the minimum Android SDK you wish to support?',
    	store: true,
        default: 15  // Android 4.0 (Ice Cream Sandwich)
    	}];

    return this.prompt(prompts).then(props=>{

    	this.domain = props.domain.split('.')[0].toLowerCase();
    	this.targetSdk = props.targetSdk
    	this.minSdk = props.minSdk
    	this.appName = props.appname.toLowerCase();
    	this.pack_name = "com."+this.domain+"."+this.appName;
    });

},



writing: function () {
	this.package_path = this.pack_name.split('.')[0]+'/'+this.pack_name.split('.')[1]+'/'+this.pack_name.split('.')[2];
	var src_path =this.appName+'/app/src/';
	var instrument_test_path = src_path+'test/java/'+this.package_path;
	var unit_test_path = src_path+'androidTest/java/'+this.package_path;
	var file_path = src_path+'main/java/';
	var absolute_path = file_path+ this.package_path;
	var network_file_path = absolute_path+'/network';

		
	this.network_package_path = this.package_path.replace(/\//g,'.')+"."+"network";
	this.fs.copy(
		this.templatePath('Andrils/'),
		this.destinationPath(this.appName)

		);

	
	mkdirp(absolute_path);
	mkdirp(instrument_test_path);
	mkdirp(unit_test_path);
	mkdirp(network_file_path);
	this.template('test/ExampleUnitTest.java',unit_test_path+'/ExampleUnitTest.java');
	this.template('test/ExampleInstrumentedTest.java',instrument_test_path+'/ExampleInstrumentedTest.java');
	this.template('init/AndroidManifest.xml',this.appName+'/app/src/main/AndroidManifest.xml');
	this.template('init/build.gradle',this.appName+'/app/build.gradle');
	this.template('init/MainActivity.java',absolute_path+'/MainActivity.java');
	this.template('init/NetworkChecker.java',network_file_path+'/NetworkChecker.java');
	this.template('andrils.json',this.appName+'/andrils.json');



},done:function(){


	this.log(chalk.magenta('Application Name:')+this.appName);
	this.log(chalk.magenta('Company Domain:')+this.domain);
	this.log(chalk.magenta('TargetSdk:')+this.targetSdk);
	this.log(chalk.magenta('MinSdk:')+this.minSdk);

	this.log(chalk.magenta('Package Name:')+this.pack_name);


},install: function () {

	this.installDependencies();
}
});
