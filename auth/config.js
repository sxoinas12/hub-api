module.exports = {
	app:{
		roles:[1,2],
		session:{
			secret:"konsta",
			resave:false,
			saveUninitialized: true,
  			cookie: { secure: true }
		},
		linkedin:{
			redirect_uri:"http://localhost:3001/users/auth/linkedin",
			client_id:"77yj9s749chsnc",
			client_secret:"EwR65xRV01x4pVo0"
		}
	}
}