const DbSystem = require('./DbSystem');
const config = require('../auth/config');


class CrudModoule {
	constructor(table,config.app.roles){
		this.table = table;
		this.repository = new DbSystem(this.table);
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