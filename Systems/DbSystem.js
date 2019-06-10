const express = require('express');
const knex = require('../db/index');



class Repository {
	constructor(table){
		this.table = table;

	}
	getRow(field,value){
		return knex.table(this.table).select('*')where(field,value);
	}

	insert(data){
		return knex.table(this.table).insert(data);
	}

	update(id,data){
		//maybe replace id with field --> depending on the table in the db
		return knex.table(this.table).where('id',id).update(data);
	}
	delete(id){
		return knex.table(this.table).where('id',id);
	}

}



module.exports = new Repository();