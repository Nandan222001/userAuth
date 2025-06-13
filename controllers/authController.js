const bcrypt = require('bcrypt');
const User = require('../models/userModel'); 

const register = async(req,res) => {
    try {

        const {name,email,password,role} = req.body;

        if(email) {
            const findEmail = await User.findOne({email});
            if(findEmail) {
                res.status(409).json({
                    success : false,
                    message : "Email allready exits !!!" 
                });
            }
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password,10);
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : "Error Encountered in Hashing Password!!!"
            })
        }

        const user = await User.create({
            name,email,password:hashedPassword,role
        })

        res.status(200).json({
            success : true,
            data:user,
            message:"User Created Succesfully !!!"
        })
    } catch (error) {
        res.status(404).json({
            success : false,
            message : "Error Encountered !!!"
        })
        console.log("Error Encountered !!! ");
    }
}

const login = async(req,res) => {
    try {

    } catch (error) {
        res.status(404).json({
            success : false,
            message : "Error Encountered !!!"
        })
        console.log("Error Encountered !!! ");
    }
}

module.exports = {login,register};
