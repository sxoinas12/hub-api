const express = require('express');
const RoutingSystem = require('../../Systems/RoutingSystem'); 
const CrudModule = require('../../Systems/CrudSystem');


class UserModule extends CrudModule{
	/*
	working Without Crud Service
	constructor(){
		//super('users','/users')
		this.router = express.Router();
		this.prefix = '/users';
		this.Routes = [
			{
				Method:"get",
				endpoint:"/:id",
				fn:(req,res,next) => {
					res.sendStatus(200);
				}
			},
			{
				Method:"post",
				endpoint:"/cust",
				fn:(req,res,next) => {
					res.send(200);
				}
			}
		]
		console.log("First ")
		RoutingSystem.RegisterRoutes('/users' , this.Routes,this._middleware);
		
	}


	_middleware(req,res,next){
		console.log(req.headers);
		return next();

	}
	*/
	constructor(){
		super('users','/users',[1,2]);
		this.MainRoute = '/users';
		this.Routes = [
			{
				Method:"get",
				endpoint:"/:id",
				fn:(req,res,next) => {
					res.sendStatus(200)
				}
			}
		]
		RoutingSystem.RegisterRoutes(this.MainRoute , this.Routes);
	}


}


module.exports = new UserModule();
