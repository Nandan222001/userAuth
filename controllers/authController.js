const bcrypt = require('bcrypt');
const User = require('../models/userModel'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async(req,res) => {
    try {

        const {name,email,password,role} = req.body;

        if(email) {
            const findEmail = await User.findOne({email});
            if(findEmail) {
                return res.status(409).json({
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
        console.log("Error Encountered !!! ",error.message);
        return res.status(404).json({
            success : false,
            message : "Error Encountered !!!"
        })
    }
}

const login = async(req,res) => {
    try {

        const { email , password } = req.body;
        
        let user = await User.findOne({email});

        if(!user) {
            return res.status(401).json({
                success:false,
                messgae : "User is not registered "
            });
        }

        const payload = {
            email : user.email,
            id : user.id,
            role : user.role,
        };

        if(await bcrypt.compare(password,user.password)) {
            let token = jwt.sign(payload , process.env.JWT_SECRET_TOKEN,{
                            expiresIn : "2h",
                        });

            user = user.toObject();
            user.token = token;
            console.log("token",token);
            user.password = undefined;

            options = {
                expiresIn : new Date( Date.now() + 3 * 24 * 60 * 60 * 1000 ),
                httpOnly : true,
            };

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                messages:"User Logged In Succesfully",
            })

        } else {
            return res.status(401).json({
                success:false,
                messgae : "Incorrect Password."
            });
        }

    } catch (error) {
        console.log("Error Encountered !!! ",error.message);
        res.status(404).json({
            success : false,
            message : "Login Failure !!!"
        })
    }
}

module.exports = {login,register};
