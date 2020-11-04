const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required : true,
        trim : true,
        min:3,
        max:20
    },
});

module.exports = mongoose.model('User');