const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const Register =new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

Register.pre('save',async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

let User = mongoose.model('Registered',Register);

module.exports = User