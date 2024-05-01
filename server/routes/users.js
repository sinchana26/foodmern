const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
//saves user login credentials to database
router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });
//this method checks if user is already present in database
		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
//Saves new user with hash password
		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
//fetches all  signup users
router.get("/getDetails", async (req, res) => {
	try{
		const user = await User.find({  });
	res.send(user).status(200);
	}catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
  });

module.exports = router;
