var express = require('express');


class Router {
	constructor(){
		this.router = express.Router();
	}

	RegisterRoutes(prefix,services = [],middleware = []){

		let router =  services.forEach((service) => {	
			return this.router[service.Method](prefix + service.endpoint,middleware,service.fn);
		})
	}


}


module.exports = new Router();