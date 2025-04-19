const express = require("express");
const userAuth = require("../../auth-middlware");
const ConnectionRequest = require("../model/connectionRequest.js");
const User = require("../model/user.js");
const router = express.Router();

//#region Getting all pending request for logged in user
router.get("/requests/received",userAuth, async(req,res,next)=>{
    try{
        const logInId = req.user.getUserId();

        let pendingReqList = await ConnectionRequest.find({toUserId:logInId,status:0}).populate("fromUserId","firstName lastName age photoUrl gender");
    
        return res.json({message:'Successfully',status:true,data:pendingReqList});
    }
    catch(e){
        res.status(400).json({message:'Bad request',status:false,data:[]});
    }
});
//#endregion

//#region Getting all connection for logged in user
router.get("/connection",userAuth, async(req,res,next)=>{
    try{
        const logInId = req.user.getUserId();

        let pendingReqList = await ConnectionRequest.find({
            status:2,
            $or:[
                {fromUserId:logInId},
                {toUserId:logInId}
            ]

        }).populate("fromUserId","firstName lastName").populate("toUserId","firstName lastName age photoUrl gender");
    
        return res.json({message:'Successfully',status:true,data:pendingReqList});
    }
    catch(e){
        res.status(400).json({message:'Bad request',status:false,data:[]});
    }
});
//#endregion

//#region Getting feeds for logged in user
router.get("/feed",userAuth, async(req,res,next)=>{
    try{
        const logInId = req.user.getUserId();
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        let reqList = await ConnectionRequest.find({
            $or:[
                {fromUserId:logInId},
                {toUserId:logInId}
            ]

        }).select("fromUserId toUserId");
        let hideUsers = new Set();
        reqList.forEach((req)=>{
            hideUsers.add(req.fromUserId.toString());
            hideUsers.add(req.toUserId.toString());
        });
        //If there is no connection exist then add login user id to set
        if(reqList && reqList.length === 0)
        {
            hideUsers.add(logInId);
        }
        reqList = await User.find({_id:{$nin:Array.from(hideUsers)}}).skip((page-1)*limit).limit(limit).select("firstName lastName age dateOfBirth bio photoUrl");

        return res.json({message:'Successfully',status:true,data:reqList});
    }
    catch(e){
        res.status(400).json({message:'Bad request',status:false,data:[]});
    }
});
//#endregion

module.exports=router;