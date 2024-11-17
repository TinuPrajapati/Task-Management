const jwt = require("jsonwebtoken");

const authenticate=(req,res,next)=>{
    const authToken = req.headers["authorization"];

    if(!authToken){
        return res.status(401).json({msg:"Login again"})
    }

    jwt.verify(authToken,process.env.jwt_token_name,(err,data)=>{
        if(err){
            return res.status(401).json({msg:"Invalid token"})
        }
        req.user=data;
        next();
    })
}

module.exports = authenticate;