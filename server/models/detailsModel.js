const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//creating new schema in database mongodb
const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	foodItem: { type: String, required: true },
	amount: { type: String, required: true },
	status: { type: String, required: true },
});
//generating authentication token
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};
//created schema called Details in database mongodb
const Details = mongoose.model("details", userSchema);
//validations for variabes of Details
const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		foodItem: Joi.string().required().label("Food Item"),
		amount: Joi.string().required().label("Amount"),
		status: Joi.string().required().label("Status"),
	});
	return schema.validate(data);
};
module.exports = { Details, validate };
