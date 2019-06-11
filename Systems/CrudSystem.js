const Repository = require('./DbSystem');
const config = require('../auth/config');
var express = require('express');
const Router = require('')



class CrudModule {
	constructor(table,roles = config.app.roles,prefix,middlewares = []){
		//must decide if i ll create CrudModule based on Table
		//super(table,roles = config.app.roles,route);
		
	}

		
	/*//create to Db

	create(data){
		//return this.repository.insert(data);
	},


	//read from Db
	read(){
		//return this.repository.get()
	},

	//Update DB
	update(){

	},
	//Delete from Db
	delete(){

	}*/

}

module.exports = CrudModule;