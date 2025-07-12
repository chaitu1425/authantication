const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    try {
        const token = req.header("x-token");
        if(!token)return res.status(401).send('Token not found')
        
        const decode = jwt.verify(token, 'jwtSecret');
        req.user = decode;
        
        next();
    } catch (error) {
        res.status(400).send("Invalid Token")
    }
}