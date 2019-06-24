const express = require('express');
const RoutingSystem = require('../../Systems/RoutingSystem');
const CrudModule = require('../../Systems/CrudSystem');
const bcrypt = require('bcrypt');
const Repository = require("../../Systems/DbSystem");
const rp = require('request-promise');



class UserModule {
	/*eslint-disable */
    constructor() {
        this.MainRoute = '/users';
        this.repository = new Repository('users');
        this._middleware = this._middleware.bind(this)
        this.Routes = [{
                Method: "post",
                endpoint: "/login",
                fn: (req, res, next) => {
                    let data = req.body;
                    this._login(data)
                    .then((user) => {
                        //req.session.user = user;
                        let {username , ...rest} = user;
                        req.session.user = username;
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
            },
            {
                Method:"get",
                endpoint:"/auth/linkedin",
                fn:(req,res,next) => {
                    //aders)
                    console.log(req.query)
                    console.log(req.body)
                    
                    let code = req.query.code;
                    let redirect_uri = encodeURIComponent('http://localhost:3001/users/auth/linkedin')
                    console.log("########")
                    let options = {
                        method:"POST",
                        uri:"https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code="+code+"&redirect_uri="+redirect_uri+"&client_id=77yj9s749chsnc&client_secret=EwR65xRV01x4pVo0",

                        headers:{
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                        
                    }
                   
                    
                    rp(options)
                    .then((resp) => {
                        console.log("####")
                        console.log(resp);
                        res.send(200)
                    }).catch((e) => {
                        console.log("ERRROr",e)
                        console.log(options.uri)
                    })
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
        if(req.session.user === undefined){
            req.user = {
                role:0
            }
            return next();
        }
        else{
            req.user = req.sesion.user;
            return next();
        }
    }

}


module.exports = new UserModule();