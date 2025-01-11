const express = require("express")
const auth =require("../auth-middlware/index");
const connectToDb = require("../config/db-configuration.js");
const User = require('./model/user.js');
const app = express()

app.use("/",auth);

app.post("/signup",async(req,res,next)=>{
    try{
        const user=new User(
            {
                firstName:"Pankaj",
                lastName:"Shah",
                gender:1,
                age:26,
                dateOfBirth:"29/4/1999",
                phoneNumber:6375957804,
                country:"India",
                email:"pankajshah@dbdevbook.com",
                password:"devbook_db@ps"
            }
        );
        await user.save();
        res.send("User created successfully");
    }
    catch(e){
        res.status(501).send("User not created "+e.message);
    }
});

//All error handling
app.use('/',(err,req,res,next)=>{
    console.log("Error handling start");
    //error handling
    res.status(500).send('Something went wrong');   
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


