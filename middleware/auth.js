const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    // get token from header
    const token = req.header('x-auth-token')

    // check token 
    if(!token){
        return res.status(401).json({ errors:[{ msg:"Access denied" }] })
    }
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ errors:[{ msg:"Token not valid." }] })
    }
}