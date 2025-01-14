const express = require("express")
const auth =require("../auth-middlware/index");
const connectToDb = require("../config/db-configuration.js");
const User = require('./model/user.js');
const app = express()

app.use("/",auth);
app.use(express.json());

app.post("/signup",async(req,res,next)=>{
    try{
        //console.log(req.body);
        const user=new User(
            req.body
        );
        await user.save();
        res.send("User created successfully");
    }
    catch(e){
        res.status(501).send("User not created "+e.message);
    }
});

app.get("/feed",async(req,res,next)=>{
    try{
        console.log(req.body);
        let user=await User.find(req.body);
        res.send(user);
    }
    catch(e){
        res.status(501).send("Users not found "+e.message);
    }
});

app.get("/user",async(req,res,next)=>{
    try{
        //console.log(req.body);
        let user=await User.findOne(req.body);
        res.send(user);
    }
    catch(e){
        res.status(501).send("User not found "+e.message);
    }
});

app.get("/user/:id",async(req,res,next)=>{
    try{
        //console.log(req.params);
        let user=await User.findById(req.params.id);
        res.send(user);
    }
    catch(e){
        res.status(400).send("User not found "+e.message);
    }
});

app.delete("/user/:id",async(req,res,next)=>{
    try{
        //console.log(req.params);
        let user=await User.findByIdAndDelete(req.params.id);
        res.send(user);
    }
    catch(e){
        res.status(400).send("User not found "+e.message);
    }
});

app.patch("/user/:id",async(req,res,next)=>{
    try{
        console.log("User update by id API");
        let user=await User.findByIdAndUpdate(req.params.id,req.body,{returnDocument:"after"});
        res.send(user);
    }
    catch(e){
        res.status(400).send("User not found "+e.message);
    }
});

app.patch("/user",async(req,res,next)=>{
    try{
        console.log("User update by email API");
        let user=await User.findOneAndUpdate({email:req.body.email},req.body);
        res.send(user);
    }
    catch(e){
        res.status(400).send("User not found "+e.message);
    }
});

//All error handling
app.use('/',(err,req,res,next)=>{
    console.log("Error handling start");
    //error handling
    res.status(500).send('Something went wrong '+err.message);   
    console.log("Error handling end");    
})

connectToDb().then(()=>{
    console.log("Database connection establish..")
    app.listen(3000,()=>{
        console.log("Server is running on port 3000.")
    });
}).catch((err)=>{
    console.log("Database connection not establish..");
});


