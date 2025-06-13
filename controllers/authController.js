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

            if(password) {

            }
        }
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
