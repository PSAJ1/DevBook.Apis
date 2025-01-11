const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    gender:{
        type:Number,
        enum:[1,2,3],
        default:1
    },
    age:{
        type:Number
    },
    dateOfBirth:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    country:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
});

const User = mongoose.model('User',userScheme);

module.exports = User;