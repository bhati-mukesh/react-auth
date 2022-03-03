const jwt = require('jsonwebtoken')
const { verifyAccessToken } = require("./utils")

const isAuthenticated = async(req,res,next)=>{
    const token = req.headers?.authorization?.split(' ')[1];
    if(token){
        try{
        const user = await verifyAccessToken(token)
        if(user){
        req.user = user;
        return next();
        }else{
            return res.status(401).json({errorCode: "03", data: 'Access denied, Please login'})            
        }
        }catch(error){
            console.log("token not decoded")
            return res.status(401).json({errorCode: "03", data: 'Access denied, Please login'})
        }
    }
    console.log("token not found")
    return res.status(401).json({errorCode: "03", data: 'Access denied, Please login'})
}

module.exports = { isAuthenticated }