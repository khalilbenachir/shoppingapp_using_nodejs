var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var schema=new Schema({
    Email:{type:String,required:true},
    password:{type:String,required:true},

});

module.exports=mongoose.model('User',schema);