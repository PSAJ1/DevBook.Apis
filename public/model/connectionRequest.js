const mongoose =require('mongoose');
const connectionRequestScheme = mongoose.Schema({
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:Number,
        required:true,
        enum:{
            values:[0,1,2,3],
            message:'{VALUE} is not accepted'
        },
        default:0
    }
},{timestamps:true});

connectionRequestScheme.pre("save",function(next){
    const connReq = this;
    if(connReq.fromUserId.equals(connReq.toUserId))
        throw new Error("You can't send to yourself");
    next();
});

connectionRequestScheme.index({fromUserId:1,toUserId:1});

const ConnectionRequest = mongoose.model("connectionRequest",connectionRequestScheme);
module.exports = ConnectionRequest;