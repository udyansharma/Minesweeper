var mongoose=require('mongoose');
var mongodb='mongodb://127.0.0.1/minedb'
mongoose.connect(mongodb,{useNewUrlParser:true});
const User=require('../models/User')
const Score=require('../models/Score');
/* const top3=(user,score)=>{
    return new Promise(function(resolve,reject){
        Score.insertOne();
    })
} */
const registerUser=(username,email,password,file)=>{
    return new Promise(function(resolve,reject){
        User.insertMany({uname:username,email:email,pass:password,image_hash:file.filename},function(err,msg){
            if(err){
                console.log("Caught error",err);
                reject(err);
            }
            else{
                resolve(msg);
        }
    });
});     
}
const getPath=(u)=>{
    return new Promise(function(resolve,reject){
        User.find({$or:[{uname:u},{email:u}]},function(err,data){
            if(err)
                reject(err);
            else
                resolve(data);
        })
    })
}
const loginUser=(unm,pass)=>{
    return new Promise(function(resolve,reject){
        User.find({$or:[{uname:unm},{email:unm}],pass:pass},function(err,data){
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        });
    })
}
exports.registerUser=registerUser;
exports.loginUser=loginUser;
exports.getPath=getPath;


                /* mongo.MongoClient.connect(mongodb, function(err, db) {
                    var gridfs = Grid(db, mongo);
                    if (gridfs) {
                        console.log("Here in correct"); 
                        //9a. create a stream, this will be
                        //used to store file in database
                        var streamwrite = gridfs.createWriteStream({
                            //the file will be stored with the name
                            filename:file.abc
                        });
                        //9b. create a readstream to read the file
                        //from the filestored folder
                        //and pipe into the database
                        fs.createReadStream(file.path).pipe(streamwrite);
                        //9c. Complete the write operation
                        streamwrite.on("close", function (f) {
                            console.log("Write written successfully in database"+f);
                            resolve(msg);
                        });
                    } else{
                        console.log("Sorry No Grid FS Object:",err);
                    }

                }) */