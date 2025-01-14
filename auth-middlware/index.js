function auth(req,res,next){
    if(req.path.startsWith('/admin')){
        if('pass' === 'pass'){
            console.log('Admin auth :- Admin Auth');
            try{
                throw new Error();
            }
            catch(e){
                console.log('Handling error in catch');
                next(e);
            }
        }
        else{
            res.status(401).send("Access denied");
        }
    }
    else if(req.path.startsWith('/user'))
    {
        if('pass' === 'pass'){
            console.log('User auth :- User Auth');
            next()
        }
        else{
            res.status(401).send("Access denied");
        }
    }
    else if(req.path.startsWith('/login') || req.path.startsWith('/login/admin') || req.path.startsWith('/signup')|| req.path.startsWith('/feed')){
        next()
    }
}

module.exports= auth;