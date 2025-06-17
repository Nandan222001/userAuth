const express = require("express");
const {auth,isStudent,isAdmin} = require('../middleware/auth');

const router = express.Router();

const {login,register} = require('../controllers/authController');

router.post('/login',login);
router.post('/register',register);

router('student',auth,isStudent,(req,res) => {
    res.status(200).json({
        success : true,
        message : "Middleware of Student is Succesful"
    })
})

router('admin',auth,isAdmin,(req,res) => {
    res.status(200).json({
        success : true,
        message : "Middleware of Admin is Succesful"
    })
})

module.exports = {router};