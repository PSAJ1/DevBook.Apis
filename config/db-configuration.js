const mongoose = require("mongoose");
function connectToDb(){
    return mongoose.connect(process.env.DB_CONNECTION);
}
module.exports=connectToDb;