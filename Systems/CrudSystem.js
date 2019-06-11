const Repository = require('./DbSystem');
const config = require('../auth/config');
const RoutingSystem = require('./RoutingSystem'); 
const Router = require('./RoutingSystem'); 
const express = require('express');



class CrudModule {
	constructor(table, MainRoute, roles = config.app.roles){
		
		this.router = express.Router();
		this.table = table;
		this.repository = new Repository(this.table);
		this.MainRoute = MainRoute
		this.Routes = [
			{
				Method:"get",
				endpoint:"/:id",
				fn:(req,res,next) => {
					res.sendStatus(200)
				}
			},
			{
				Method:"post",
				endpoint:"/",
				fn:(req,res,next) => {
					let data = req.body;
					console.log("ssss",data);
					this.create(data)
					.then((r) => {
						res.sendStatus(200)
					})
					.catch((e) => {
						console.log(e)
					})
				}
			}
			]
		RoutingSystem.RegisterRoutes(this.MainRoute , this.Routes);
		

	}
	create(data){
		return this.repository.insert(data);
	}
/*

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