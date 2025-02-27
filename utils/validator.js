const validator = require("validator");
function Validation(req){
    const {password}=req.body;
    if(!validator.isStrongPassword(password))
        throw new Error("Validation Error:- Password is not strong");
}
function ValidationForUpdateProfile(req){
    let isValid=false
    const fieldsAllowedForUpdate = ['firstName','lastName','photoUrl','bio','skills','country'];
    let keys=Object.keys(req.body);
    if(keys && !keys.every(k=>fieldsAllowedForUpdate.includes(k)))
        throw new Error("Fields are not allowed for update");
    if(req.body.skills && req.body.skills.length > 0 && !req.body.skills.length <= 10)
        throw new Error("Maximum 10 Skills are allowed");
    isValid=true;
    return isValid;
}

function ValidationForURL_SendConnection(req,res,next){
    try{
        const allowedStatus = ['0','1'];
        let status=req.params.status;
        if(status && !allowedStatus.includes(status))
            throw new Error("Bad Request");
        next();
    }
    catch(e){
        res.status(400).json({message:'falied',status:false,data:null});
    }
}

function ValidationForURL_ReviewConnection(req,res,next){
    try{
        const allowedStatus = ['2','3'];
        let status=req.params.status;
        if(status && !allowedStatus.includes(status))
            throw new Error("Bad Request");
        next();
    }
    catch(e){
        res.status(400).json({message:'falied',status:false,data:null});
    }
}
module.exports={Validation,ValidationForUpdateProfile,ValidationForURL_SendConnection,ValidationForURL_ReviewConnection};