const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:30
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:30
    },
    photoUrl:{
        type:String, 
    },
    bio:{
        type:String,
        minLength:2,
        maxLength:30,
        default:"It is default bio!!"        
    },
    skills:{
        type:[String]
    },
    gender:{
        type:Number,
        enum:[1,2,3],
        required:true
    },
    age:{
        type:Number,
        min:18
    },
    dateOfBirth:{
        type:String,
        required:true,
        trim:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    country:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm.test(value)))
            {
                throw new Error("Not an validate email");
            }
        }
    },
    password:{
        type:String,
        trim:true,
        required:true
    }
},{timestamps:true});

const User = mongoose.model('User',userScheme);

module.exports = User;