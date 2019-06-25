const express = require('express');
const RoutingSystem = require('../../Systems/RoutingSystem');
const CrudModule = require('../../Systems/CrudSystem');
const bcrypt = require('bcrypt');
const Repository = require("../../Systems/DbSystem");
const rp = require('request-promise');
const config = require('../../auth/config');


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
                        let {username , ...rest} = user;
                        req.session.user = username;
                        res.send(username);
                    }).catch((e) => {
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
                    let code = req.query.code;
                    this._loginWithLinkedin(code)
                    .then((profile) => {
                        req.session.user = profile;
                        res.redirect("http://localhost:3000/home/?profile="+JSON.stringify(profile))})
                    .catch((e) => console.log(e))
                }
            },
            {
                Method:"get",
                endpoint:"/me",
                fn:(req,res,next) => {
                    console.log(req.session);
                    res.send(200)
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


    _loginWithLinkedin(code){
        let redirect_uri = encodeURIComponent(config.app.linkedin.redirect_uri);
        let token;
        let options = {
            method:"POST",
            uri:`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${config.app.linkedin.redirect_uri}&client_id=${config.app.linkedin.client_id}&client_secret=${config.app.linkedin.client_secret}`,

            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        return rp(options)
        .then((resp) => {
            resp = JSON.parse(resp);
            token = resp.access_token;                      
            let options = {
                method:"get",
                uri:"https://api.linkedin.com/v2/me",
                auth: {
                    'bearer': token
                }
            };
            return rp(options)
            .then((data) => {
                data = JSON.parse(data);
                let profile = {
                    username: data.username || data.localizedLastName,
                    firstName: data.localizedLastName ,
                    lastName: data.localizedFirstName,
                    token:token
                }
                return this.repository.get('username',profile.username)
                .then((data) => {
                    if(data.length > 0) {
                        return this.repository.update('username',profile.username,{token:token})
                        .then(() => profile)
                    }else{
                        return this.repository.insert(profile)
                        .then(() => profile)
                    }
                    })
                })
            }).catch((e) => console.log(e))
    }





    _middleware(req, res, next) {
        return next();
    }

}


module.exports = new UserModule();