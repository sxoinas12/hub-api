const express = require('express');
const RoutingSystem = require('../../Systems/RoutingSystem');
const CrudModule = require('../../Systems/CrudSystem');
const bcrypt = require('bcrypt');
const Repository = require("../../Systems/DbSystem");

class UserModule {
	/*eslint-disable */
    constructor() {
        this.MainRoute = '/users';
        this.repository = new Repository('users');
        this.Routes = [{
                Method: "post",
                endpoint: "/",
                fn: (req, res, next) => {
                   	let data = req.body;
                    this.repository.insert(data)
                    .then(() => {
                        res.sendStatus(200);
                    }).catch((e) => {
                        console.log(e);
                        res.sendStatus(500);
                    });
                }
            },
            {
                Method: "post",
                endpoint: "/register",
                fn: (req, res, next) => {
                    let data = req.body;
                    this._register()
                    .then((user) => {
                        res.send(user);
                    });
                }
            }
        ];
        RoutingSystem.RegisterRoutes(this.MainRoute, this.Routes, this._middleware);
    }

	/*eslint-enable */


    _middleware(req, res, next) {
        return next();
    }

    _register(data) {}


}


module.exports = new UserModule();