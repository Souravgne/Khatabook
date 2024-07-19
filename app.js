const express = require('express');
const path = require('path');
const app = express();
const { userModel , validateUserData} = require('./models/user'); // Ensure validateUserData is still imported if needed elsewhere

app.set("view engine", "ejs");

// Middleware setup
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Route for displaying the homepage

app.get("/", function(req, res) {
   
    res.render("index");
});
app.post("/", function(req, res) {
    let {email} = req.body; 
    // console.log(/record/email)
    res.redirect(`/record/${email}`);
});

// Corrected route for displaying the signup form using GET method
app.get("/signup", function(req, res) {
    res.render("signup");
});

// Route for handling signup form submission
app.post("/signup", async function(req, res) {
    let { email, password } = req.body;
    
    try {
        await validateUserData({ email, password });
        let user = await userModel.create({
            email, password
        });
       console.log(user)
        // Redirect to homepage after successful signup
        res.render("index");
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

// Route for handling record creation associated with a user
app.get("/record/:username", function(req, res){
    const username = req.params.email;
    
    // Logic to handle record creation based on userId
    
    res.render("record", {username });
});

// Adjusted route for finding a user by username and rendering createrecord view
app.get("/createrecord/:username", async function(req, res){
    const username = req.params.username;
    
    try {
        const user = await userModel.findOne({ username: username });
        console.log(user)
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        // Render createrecord view, passing the found user object
        res.render("createrecord", { user });
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).send('Internal Server Error');
    }
});

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));
