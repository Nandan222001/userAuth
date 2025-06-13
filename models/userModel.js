const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name : {
        type : String , 
        required : true ,
        trim : true ,
        maxLength : 50 ,
    },
    email : {
        type : String ,
        required : true ,
        trim : true ,
        maxLength : 50
    },
    password : {
        type : String ,
        required : true , 
    },
    role : {
        type : String ,
        enum : ["Admin" , "Student" , "Visitor"]
    }
})

module.exports = mongoose.model('User',userModel);