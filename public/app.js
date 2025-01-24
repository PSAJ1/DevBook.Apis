const express = require("express");
const cookieParser = require("cookie-parser");
const connectToDb = require("../config/db-configuration.js");
const authRoute = require("./router/auth.js");
const profileRoute = require("./router/profile.js");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/",authRoute);
app.use("/profile",profileRoute);

// const fieldsAllowedForUpdate = ['firstName','lastName','photoUrl','bio','skills','country'];
// app.get("/user",async(req,res,next)=>{
//     try{
//         //console.log(req.body);
//         let user=await User.findOne(req.body);
//         res.send(user);
//     }
//     catch(e){
//         res.status(501).send("User not found "+e.message);
//     }
// });

// app.get("/user/:id",async(req,res,next)=>{
//     try{
//         //console.log(req.params);
//         let user=await User.findById(req.params.id);
//         res.send(user);
//     }
//     catch(e){
//         res.status(400).send("User not found "+e.message);
//     }
// });

// app.delete("/user/:id",async(req,res,next)=>{
//     try{
//         //console.log(req.params);
//         let user=await User.findByIdAndDelete(req.params.id);
//         res.send(user);
//     }
//     catch(e){
//         res.status(400).send("User not found "+e.message);
//     }
// });

// app.patch("/user/:id",async(req,res,next)=>{
//     try{
//         if(!req.body)
//             throw new Error("Body is not valid");
//         let keys=Object.keys(req.body);
//         if(keys && !keys.every(k=>fieldsAllowedForUpdate.includes(k)))
//             throw new Error("Fields are not allowed for update");
//         if(req.body.skills && req.body.skills.length > 0 && !req.body.skills.length <= 10)
//             throw new Error("Maximum 10 Skills are allowed");

//         console.log("User update by id API");
//         let user=await User.findByIdAndUpdate(req.params.id,req.body,{returnDocument:"after",runValidators:true});
//         res.send(user);
//     }
//     catch(e){
//         res.status(400).send("User not found "+e.message);
//     }
// });

// app.patch("/user",async(req,res,next)=>{
//     try{
//         if(!req.body)
//             throw new Error("Body is not valid");
//         let keys=Object.keys(req.body);
//         if(keys && !keys.every(k=>fieldsAllowedForUpdate.includes(k)))
//             throw new Error("Fields are not allowed for update");
//         if(req.body.skills && req.body.skills.length > 0 && !req.body.skills.length <= 10)
//             throw new Error("Maximum 10 Skills are allowed");

//         console.log("User update by email API");
//         let user=await User.findOneAndUpdate({email:req.body.email},req.body,{runValidators:true});
//         res.send(user);
//     }
//     catch(e){
//         res.status(400).send("User not found "+e.message);
//     }
// });

//All error handling
app.use('/',(err,req,res,next)=>{
    //error handling
    res.status(500).send('Something went wrong '+err.message);     
})

connectToDb().then(()=>{
    console.log("Database connection establish..")
    app.listen(3000,()=>{
        console.log("Server is running on port 3000.")
    });
}).catch((err)=>{
    console.log("Database connection not establish..");
});


