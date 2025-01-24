const jwt=require("jsonwebtoken");
const User=require("../public/model/user");
async function userAuth(req,res,next){
    try{
        let token = req.cookies.badge;
        if(!token)
            throw new Error("Token is not valid");

        let userId=jwt.verify(token,"db@devBook_.2923");

        let user=await User.findById(userId,"id firstName lastName email");
        if(!user)
            throw new Error("Unauthorized user");
        req.user={
            getUserId:()=>user.id,
            getUserEmail:()=>user.email,
            getUserFirstName:()=>user.firstName,
            getUserFullName:()=>user.firstName +" "+ user.lastName,
        };
        next();
    }
    catch(err){
        res.send("Error found:- "+err.message);
    }
}

module.exports= userAuth;