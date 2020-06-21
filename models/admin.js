var mongoose = require('mongoose');


var adminSchema = mongoose.Schema({
    user:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    district:{
        type:String,
        require:true
    }
})



module.exports = mongoose.model("Admin",adminSchema);