const express = require('express');
const path = require('path');
const app = express();
const { userModel, validateUserData } = require('./models/user');

app.set("view engine", "ejs");

// Middleware setup
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Route for displaying the signup form
app.get("/signup", function(req, res) {
    res.render("signup");
});

// Route for handling form submission
app.post("/signup", async function(req, res) {
    let { email, password } = req.body;
    
    // Validate user data
    try {
        await validateUserData({ email, password });
        // Create user in database if validation passes
        let user = await userModel.create({
            email, password
        });
       
        // Redirect to homepage after successful signup
        res.redirect("/");
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

// Route for displaying the homepage
app.get("/", function(req, res) {
    res.render("index");
});

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));
