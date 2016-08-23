'use strict'

var chalk = require('chalk');

Array.prototype.contains = function(search) {
	return	this.indexOf(search.toLowerCase())>-1; 
}
String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}




function  processDataTypes(){
var list =["int","long","boolean","float"];


}
module.exports.Array = Array;
module.exports.String = String;