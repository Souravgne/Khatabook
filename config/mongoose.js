const mongoose = require('mongoose')
const debuglog = require("debug")("development:mongooseconfig"); 
const mongooseconnection = require('./config/mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/Khatabook")

const db = mongoose.connection; 

db.on("error" , function(err){
    debuglog(err); 
})


db.on("open" , function(){
    debuglog("connected to db...")
})

module.exports = db;    