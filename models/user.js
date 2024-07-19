const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect("mongodb://127.0.0.1:27017/testadvdb"); 

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
});

let userModel = mongoose.model("User", userSchema);

function validateUserData(userData) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });
    const { error } = schema.validate(userData);
    if (error) {
        throw new Error(error.details[0].message);
    }
    return userData;
}

module.exports = { validateUserData, userModel };
