const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/testadvdb "); 
// const db = mongoose.connection;

const userSchema = mongoose.Schema({
    
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
})


module.exports =   mongoose.model("user" , userSchema); 