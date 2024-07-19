const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs'); 
const { isUtf8 } = require('buffer');
app.set("view engine" , "ejs")

app.use(express.json());
app.use(express.static(path.join(__dirname , "public")))
app.use(express.urlencoded({extended: true}))


app.get("/" , function(req , res){

    res.render("index");

    
})

app.get("/signup" , function(req , res){

    res.render("signup")
    
    
})

    
app.listen(3000)
