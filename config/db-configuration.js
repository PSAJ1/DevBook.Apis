const mongoose = require("mongoose");

function connectToDb(){
    return mongoose.connect('mongodb+srv://pankaj:ps_%402923@pankajshah.e8sqy.mongodb.net/DevBook');
}
module.exports=connectToDb;