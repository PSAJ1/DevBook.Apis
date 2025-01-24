const validator = require("validator");
function Validation(req){
    const {password}=req.body;
    if(!validator.isStrongPassword(password))
        throw new Error("Validation Error:- Password is not strong");
}
function ValidationForUpdateProfile(req){
    const fieldsAllowedForUpdate = ['firstName','lastName','photoUrl','bio','skills','country'];
    let keys=Object.keys(req.body);
    if(keys && !keys.every(k=>fieldsAllowedForUpdate.includes(k)))
        throw new Error("Fields are not allowed for update");
    if(req.body.skills && req.body.skills.length > 0 && !req.body.skills.length <= 10)
        throw new Error("Maximum 10 Skills are allowed");
}
module.exports={Validation,ValidationForUpdateProfile};