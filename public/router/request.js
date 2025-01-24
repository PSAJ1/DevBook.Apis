app.post("/sendrequest",userAuth,async(req,res,next)=>{
    try{
            res.send(req.user.getUserFirstName()+" send a request");
        }
    catch(e){
        res.status(501).send("Error found:- "+e.message);
    }
});