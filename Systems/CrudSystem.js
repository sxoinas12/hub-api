const Repository = require('./DbSystem');
const config = require('../auth/config');


class CrudModoule {
	constructor(table,config.app.roles){
		//must decide if i ll create CrudModule based on Table 
		this.table = table;
		this.repository = new Repository(this.table);
	}


	//create to Db
	create(){

	},


	//read from Db
	read(){

	},

	//Update DB
	update(){

	},
	//Delete from Db
	delete(){

	}

}

module.exports = new CrudModule();