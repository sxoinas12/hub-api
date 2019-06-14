const UserModule = require("./index");


let MockLoginUser = {
	"username":"test",
	"password":"1234"
}


let MockRegisterUser = {
	"username":"test"+Math.random(),
	"password":"1234",
	"email":"test"+Math.random()+"@gmail.com"
}

test('Login User',done => {
	UserModule._login(MockLoginUser)
	.then((user) => {
		expect(user.username).toBe("test");
		done();
	})
})


test("Register User", done => {
	UserModule._register(MockRegisterUser)
	.then((user) => {
		console.log(user);
		expect(user).toHaveProperty("username");
		done();
	})
})


