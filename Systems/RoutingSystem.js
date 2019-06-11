var express = require('express');


class Router {
	constructor(RoutePath){
		this.router = express.Router();
		this.routePath = RoutePath
		this._routes = [];
		//this.app = app
		this.registerServices();
	}


	/*getServices(services){
		/*return Services.map((service) => {
			method:service.Method,
			path:service.path,
			fn:service.fn
		})
		return {
			method:service.Method,
			path:service.path,
			fn:service.fn
		}
	}*/

	registerServices(){
		 // /this.router[this.routePath](this.service.path,this.service.fn)
		let services = [
			{
				Method:"get",
				endpoint:"/",
				fn:(req,res,next) => {
					console.log("hi")
					res.send(200)
				}
			},
			{
				Method:"post",
				endpoint:"/some",
				fn:(req,res,next) => {
					console.log("ss")
					res.send(200)
				}
			},
		]
		let router =  services.forEach((service) => {	
			return this.router[service.Method](this.routePath + service.endpoint,service.fn);
		})
		return router;
	}


}


module.exports = Router;