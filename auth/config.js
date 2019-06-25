module.exports = {
	app:{
		roles:[1,2],
		session:{
			secret:"konsta",
			resave:true,
			saveUninitialized: true,
  			cookie: { secure: false }
		},
		linkedin:{
			redirect_uri:"http://localhost:3001/users/auth/linkedin",
			client_id:"77yj9s749chsnc",
			client_secret:"EwR65xRV01x4pVo0"
		}
	}
}