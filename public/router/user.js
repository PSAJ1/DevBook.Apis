const express = require("express");
const userAuth = require("../../auth-middlware");
const ConnectionRequest = require("../model/connectionRequest");
const router = express.Router();

//#region Getting all pending request for logged in user
router.get("/requests/received",userAuth, async(req,res,next)=>{
    try{
        const logInId = req.user.getUserId();

        let pendingReqList = await ConnectionRequest.find({toUserId:logInId,status:0}).populate("fromUserId","firstName lastName");
    
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

        }).populate("fromUserId","firstName lastName").populate("toUserId","firstName lastName");
    
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

        let pendingReqList = await ConnectionRequest.find({
            status:2,
            $or:[
                {fromUserId:logInId},
                {toUserId:logInId}
            ]

        }).populate("fromUserId","firstName lastName").populate("toUserId","firstName lastName");
    
        return res.json({message:'Successfully',status:true,data:pendingReqList});
    }
    catch(e){
        res.status(400).json({message:'Bad request',status:false,data:[]});
    }
});
//#endregion

module.exports=router;