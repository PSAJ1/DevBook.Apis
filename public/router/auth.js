const express=require("express");
const validator = require("validator");
const User = require("../model/user.js");
const {Validation} = require("../../utils/validator.js");

const router=express.Router();
//#region Signup
router.post("/signup",async(req,res,next)=>{
    try{
        // validating password
        Validation(req);
        const user=new User({
            "firstName":req.body.firstName,
            "lastName":req.body.lastName,
            "password":req.body.password,
            "email":req.body.email,
            ...req.body
        });
        // Encrypt th password
        await user.createPasswordHash();
        await user.save({ timestamps: { createdAt: true, updatedAt: false } });
        res.send("User created successfully");
    }
    catch(e){
        res.status(501).send("User not created "+e.message);
    }
});
//#endregion

//#region Login
router.post("/login",async(req,res,next)=>{
    try{
        // validating email is valid or not
        if(req.body.email && req.body.password && !validator.isEmail(req.body.email))
            throw new Error("Invalid email format");
        let userDetails= await User.findOne({email:req.body.email},["id","email","password"]);
        if(!userDetails)
            throw new Error("Invalid credentials");
        let isPasswordIsValid=await userDetails.verifyPassword(req.body.password);
        if(isPasswordIsValid){
            let token=userDetails.getJwtBadge();
            res.cookie("badge",token);
            res.send("LoggedIn successfully");
        }
        else{
            res.send("Invalid credentials");
        }
    }
    catch(e){
        res.status(501).send("Error found:- "+e.message);
    }
});
//#endregion

//#region Logout
router.post("/logout",async(req,res,next)=>{
    try{
        res.cookie("badge",null,{expires:new Date(Date.now())});
        res.send("Logout successfully");
    }
    catch(e){
        res.status(501).send("Error found:- "+e.message);
    }
});
//#endregion

module.exports = router;