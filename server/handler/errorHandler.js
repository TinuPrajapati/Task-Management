const errorHandler =(err,req,res,next)=>{
    if(err){
        return res.status(404).json(err)
    }else{
        next();
    }
}

module.exports = errorHandler;