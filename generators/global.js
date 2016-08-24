'use strict'

var chalk = require('chalk');
var fs = require('fs');

Array.prototype.contains = function(search) {
	return	this.indexOf(search.toLowerCase())>-1; 
}
String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}


function values(dataObject){
	var dataArray = new Array;
	for(var o in dataObject) {
		dataArray.push(dataObject[o]);
	}
	return dataArray
}




function getFiles(dir, fileList){
	fileList = fileList || [];

	var files = fs.readdirSync(dir);
	for(var i in files){
		if (!files.hasOwnProperty(i)) continue;
		var name = dir+'/'+files[i];
		if (fs.statSync(name).isDirectory()){
			getFiles(name, fileList);
		} else {
			fileList.push(name);
		}
	}
	return fileList;
}



function  processDataTypes(args){
	var list =["int","long","boolean","float"];
	var object = {


	}
	for(var i = 0 ; i < args.length; i++){
		var dataType = args[i].split(':');


		if(dataType[1].includes('@')){

			var temp = dataType[1].split('@');
			dataType[1] = temp[0] + '<' + temp[1] +'>';
			object[dataType[0]] =  dataType[1];
		}
		if(!list.contains(dataType[1])){
			dataType[1] = dataType[1].capitalizeFirstLetter();
			object[dataType[0]] =  dataType[1];
			
		}else{
			object[dataType[0]] =  dataType[1];
		}





		args[i] = dataType[0]+":"+dataType[1];

		
	}

	return object;

}
module.exports.getFiles = getFiles;
module.exports.processDataTypes = processDataTypes;
module.exports.Array = Array;
module.exports.String = String;
module.exports.values = values;

