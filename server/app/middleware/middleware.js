const jwt = require('jsonwebtoken')
const { model } = require('mongoose')

module.exports = function(req,res,next){
    try {
        let token = req.header("x-token");
        if(!token){
            return res.send('Token not found')
        }
        

        let decode = jwt.verify(token,'jwtSecret');
        req.user = decode.user
        next();


    } catch (error) {
        res.send(error)
    }
}