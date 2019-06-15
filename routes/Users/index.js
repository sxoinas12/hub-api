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
                endpoint: "/login",
                fn: (req, res, next) => {
                    let data = req.body;
                    this._login(data)
                    .then((user) => {
                        //req.session.user = user;
                        console.log("Coming here to send 200",user)
                        let {username , ...rest} = user;
                        res.send(username);
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
                    this._register(data)
                    .then((user) => {
                        res.send("User Regirestered SUccesfully");
                    })
                    .catch((e) => res.sendStatus(501))
                }
            }
        ];
        RoutingSystem.RegisterRoutes(this.MainRoute, this.Routes, this._middleware);
    }

	/*eslint-enable */


    

    _register(data) {
        let {username,password,email} = data;
        return this.repository.get('username',username)
        .then((data) => {
            if(data.length > 0){
                throw new Error('Already registered')
            }
            return true;
        })
        .then(() => {
            let hash = bcrypt.hash(password,10)
            return hash;
        })
        .then((hash) => {
            data.password = hash;
            return this.repository.insert(data)
        })
        .then(() => {
            return data;
        })
        .catch((e) => {
            console.log("Error during Registration",e);
            return e;
        })
    }

    _login(data){
        let {username,password} = data;
        let user;
        return this.repository.get('username',username)
        .then((data) => {
            if(data.length === 0){
                throw new Error("user doesnt exist")
            }
            user = data[0];
            return data[0];
        })
        .then((user) => {
            return bcrypt.compare(password,user.password)
        })
        .then((authenticated) => {
            if(!authenticated){
                throw new Error("Wrong password")
            }
            return user;
        })
    }
    _middleware(req, res, next) {
        return next();
    }

}


module.exports = new UserModule();