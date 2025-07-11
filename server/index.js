const express = require('express')
const mongoose = require('mongoose')
const model = require("./app/model/model_scheme.js")
const jwt = require('jsonwebtoken')
const middleware = require("./app/middleware/middleware.js")
const app = express();
app.use(express.json());

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
        const {username,email,password,confirmPass} = req.body;
        let exist = await model.findOne({email});
        if(exist){
            res.send('User Already Exist');
        }
        if(password!==confirmPass){
            res.send('Password Not Matched');
        }
        let newUser =new model({
            username,
            email,
            password,
            confirmPass
        }) 
        let newuser = await newUser.save();
        res.send("Register Successful");
    }catch(err){
        console.log({Error:err.errmsg})
    }
})

app.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;

        let exist = await model.findOne({email})

        if(!exist){
            res.send("No User Found")
        }
        if(exist.password != password){
            res.send("Invalid Credentials")
        }
        let payload = {
            user:{
                id:exist.id
            }
        }

        jwt.sign(payload,'jwtSecret',{expiresIn:3600000},
            (err,token)=>{
                if(err) throw err;
                return res.json({token})
            }
        )
    
    }catch(err){
        console.log({Error:err.errmsg});
    }
})


app.get('/profile',middleware,async(req,res)=>{
    try {
        let exist = await model.findById(req.user.id)

        if(!exist){
            return res.send("User not found")
        }
        res.json(exist);
    } catch (error) {
        res.send({Error:err.errmsg})
    }
})



app.listen(8000, (req, res) => {
    console.log("Server is running on 8000");
})