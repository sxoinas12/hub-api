const express = require('express');
const knex = require('../db/index');



class DbModule {
	constructor(table){
		this.table = table;

	}
	get(){

	}	
}



module.exports = new DbModule();