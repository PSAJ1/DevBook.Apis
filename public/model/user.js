const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userScheme = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:20
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:20
    },
    photoUrl:{
        type:String, 
        validate(value){
            if(!validator.isURL(value))
                throw new Error("Url is not valid");
        }
    },
    bio:{
        type:String,
        minLength:2,
        maxLength:50,
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
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value))
                throw new Error("Password is not strong");
        }
    }
},{timestamps:true});
userScheme.methods.getJwtBadge=function(){
    let user=this;
    let token=jwt.sign(`${user.id}`,"db@devBook_.2923");
    if(!token)
        throw new Error("Token is not generated");
    return token;
};
userScheme.methods.verifyPassword=async function(passwordInputbyUser){
    let user=this;
    let isPasswordIsValid=await bcrypt.compare(passwordInputbyUser,user.password);
    if(!isPasswordIsValid)
        throw new Error("Wrong password");
    return isPasswordIsValid;
};
userScheme.methods.createPasswordHash=async function(){
    let password=this.password;
    passwordHash=await bcrypt.hash(password,15);
    this.password=passwordHash;
};
const User = mongoose.model('User',userScheme);

module.exports = User;