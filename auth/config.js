module.exports = {
	app:{
		roles:[1,2],
		session:{
			secret:"konsta",
			resave:false,
			saveUninitialized: true,
  			cookie: { secure: true }
		}
	}
}