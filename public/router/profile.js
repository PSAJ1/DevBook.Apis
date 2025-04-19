const express=require("express");
const User = require("../model/user.js");
const userAuth = require("../../auth-middlware/index.js");
const {ValidationForUpdateProfile} = require("../../utils/validator.js");
const router=express.Router();
//#region Profile/view
router.get("/view",userAuth,async(req,res,next)=>{
    try{
        const user = await User.findOne({_id:req.user.getUserId()},["email","firstName","lastName","bio","skills","gender","age","dateOfBirth","phoneNumber","country","photoUrl"]);
        if(user)
            res.json({status:true,message:'',data:user});
        else
            res.json({status:false,message:'Something went wrong',data:null})
    }
    catch(e){
        res.status(501).send("Users not found "+e.message);
    }
});
//#endregion

//#region Profile/edit
router.patch("/edit",userAuth,async(req,res,next)=>{
    try{
        if(!ValidationForUpdateProfile(req))
            throw new Error("Validation Failed");

        let updateUser={
            ...req.body
        };
        let u=await User.findByIdAndUpdate(req.user.getUserId(),updateUser,{returnDocument:"after",runValidators:true});
        res.send(u)
    }
    catch(e){
        res.status(501).send("Users not found "+e.message);
    }
});
//#endregion

module.exports = router;