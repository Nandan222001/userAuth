const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req,res,next) => {

    try {
        const {token} = req.body;
        
        if(!token) {
            return res.status(201).json({
                success : false,
                message : "Token not found"
            });
        }
        console.log("The request token is ",token)
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET_TOKEN);
            console.log(decode);
            req.user = decode;

        } catch (error) {
            return res.status(500).json({
                success : false,
                message:"Internal Server Error"
            })
        }
        
        next();

    } catch (error) {
        return res.status(500).json({
            success : false,
            message:"Internal Server Error"
        })
    }
}

const isStudent = (req,res,next) => {

    try {
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message : "This is protected route of student"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success : false,
            message:"User Role is not defined"
        })
    }

}

const isAdmin = (req,res,next) => {
    try {
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message : "This is protected route of Admin"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success : false,
            message:"Admin Role is not defined"
        })
    }
}

module.exports = {auth,isStudent,isAdmin};