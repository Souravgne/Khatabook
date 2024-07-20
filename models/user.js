const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt'); // Ensure bcrypt is installed via npm
const saltRounds = 10;

// Correctly import the database connection from mongoose.js
const db = require('../config/mongoose.js');


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

// Pre-save hook for password hashing
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    } catch (error) {
        console.error(`Error hashing password: ${error.message}`);
        next(error);
    }
});

const userModel = mongoose.model("User", userSchema);

function validateUserData(userData) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required()
    });
    const { error } = schema.validate(userData);
    if (error) {
        throw new Error(error.details[0].message);
    }
    return userData;
}

module.exports = { validateUserData, userModel };
