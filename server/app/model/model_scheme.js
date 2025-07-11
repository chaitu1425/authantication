const mongoose = require('mongoose')

const Register =new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPass:{
        type:String,
        require:true
    }
})

let model = mongoose.model('Registered',Register);

module.exports = model