const express = require('express')
const mongoose = require('mongoose')
const User = require("./app/model/model_scheme.js")
const jwt = require('jsonwebtoken')
const middleware = require("./app/middleware/middleware.js")
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors({origin:"*"}))

mongoose.connect("mongodb://localhost:27017", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Database connected");
})
app.get("/", (req, res) => {
    res.send("Hello World");
})

app.post("/register",async(req,res)=>{
    try{
        const { username, email, password, confirmPass } = req.body;

        const exist = await User.findOne({ email });
        if(exist){
            return res.status(400).send('User Already Exist');
        }
        if(password !== confirmPass){
           return res.status(400).send('Password Not Matched');
        }

        const newUser =new User({
            username,
            email,
            password,
        }) 
        let newuser = await newUser.save();
        res.send("Register Successful");
    }catch(err){
        console.log('Server error during registration')
    }
})

app.post("/login",async(req,res)=>{
    try{
        const { email, password } = req.body;

        const exist = await User.findOne({ email });

        if(!exist){
            return res.status(404).send("No User Found")
        }

        const isMatch = await password===exist.password?true:false;
        

        if (!isMatch){
           return res.status(401).send("Invalid Credentials");
        }
        const payload = { id: exist._id } 

        jwt.sign(payload,'jwtSecret',{ expiresIn:'1h' },
            (err,token)=>{
                if(err) throw err;
                res.json({ token })
            }
        );
    }catch(err){
        console.log("Login error:",err)
        res.status(500).send("Server error during login");
    }
});


app.get('/profile',middleware,async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')

        if(!user){
            return res.send("User not found")
        }
        res.json(user);
    } catch (error) {
        res.send("Error fetching profile")
    }
})



app.listen(8000, (req, res) => {
    console.log("Server is running on 8000");
})