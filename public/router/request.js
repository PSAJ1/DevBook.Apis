const express=require("express");
const ConnectionRequest = require("../model/connectionRequest.js");
const User = require("../model/user.js");
const userAuth = require("../../auth-middlware/index.js");
const {ValidationForURL_SendConnection,ValidationForURL_ReviewConnection} = require("../../utils/validator.js");
/*
    -: Status :-
    0 = interested
    1 = ignored
    2 = accepted
    3 = rejected
*/
const router=express.Router();

//#region /send/:status/:toUserId (Status can be 0 or 1)
router.post("/send/:status/:toUserId",ValidationForURL_SendConnection,userAuth,async(req,res,next)=>{
    try{
            const fromId = req.user.getUserId();
            const toId = req.params.toUserId;
            const status = req.params.status;
            let userExist = await User.findById(toId);
            if(!userExist)
                return res.status(200).json({message:'User not found',status:true,data:null});

            let existingReq = await ConnectionRequest.findOne({$or:[
                {fromUserId:fromId,
                 toUserId:toId   
                },
                {
                    fromUserId:toId,
                    toUserId:fromId
                }
            ]});

            if(existingReq)
                return res.status(200).json({message:'Already exist',status:true,data:null});

            let ConnectionReq = new ConnectionRequest({
                toUserId:toId,
                fromUserId:fromId,
                status
            });

            ConnectionReq = await ConnectionReq.save({ timestamps: { createdAt: true, updatedAt: false } });
            res.json({message:'Successfully',status:true,data:ConnectionReq});
        }
    catch(e){
        res.status(400).send("Error found:- "+e.message);
    }
});
//#endregion

//#region /review/:status/:toUserId (Status can be 2 or 3)
router.post("/send/:status/:requestId",ValidationForURL_ReviewConnection,userAuth,async(req,res,next)=>{
    try{
            const fromId = req.user.getUserId();
            const reqId = req.params.requestId;
            const status = req.params.status;
            let requestExist = await ConnectionRequest.findOne({_id:reqId,toUserId:fromId,status:0});
            if(!requestExist)
                return res.status(200).json({message:'Connection request not found',status:true,data:null});
            requestExist.status=status;
            requestExist = await requestExist.save({ timestamps: { createdAt: false, updatedAt: true } });
            res.json({message:'Successfully',status:true,data:requestExist});
        }
    catch(e){
        res.status(400).send("Error found:- "+e.message);
    }
});
//#endregion
module.exports = router;