const express = require("express");
const router = express.Router();

const {auth,isStudent,isAdmin} = require('../middleware/auth');
const {login,register} = require('../controllers/authController');

router.post('/login',login);
router.post('/register',register);

router.get('/test',auth,(req,res) => {
    res.status(200).json({
        success : true,
        message : "Middleware of Test is Succesful"
    })
})

router.get('/student',auth,isStudent,(req,res) => {
    res.status(200).json({
        success : true,
        message : "Middleware of Student is Succesful"
    })
})

router.get('/admin',auth,isAdmin,(req,res) => {
    res.status(200).json({
        success : true,
        message : "Middleware of Admin is Succesful"
    })
})

module.exports = {router};