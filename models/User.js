var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var UserSchema=new Schema({
    uname:String,
    email:String,
    pass:String,
    image_hash:String
});
module.exports=mongoose.model('User',UserSchema);