const express = require("express")
const auth =require("../auth-middlware/index");
const app = express()
app.use("/",auth);
app.get("/admin",(req,res,next)=>{
    console.log("/ Route Handler 1");
    //res.send("Hello");
    next();
});
app.get("/users",(req,res,next)=>{
    console.log("/User Route handler 2");
    //res.send("Hello");
});
app.get("/admin/users",(req,res,next)=>{
    console.log("/User Route handler 2");
    //res.send("Hello");
});
app.listen(3000,()=>{
    console.log("Server is running on port 3000.")
});

