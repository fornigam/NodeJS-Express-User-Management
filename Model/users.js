const bcrypt =  require('bcrypt');
const mongoose =  require('mongoose');

let UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,        
    }
});


UserSchema.statics.authentication = (email, password, callback) =>{    
    User.findOne({email : email }).exec(function(err,user){
        if(err){
            return callback(err);
        } else if(!user) {
            var err = new Error('User is not exist');
            err.status = 401;
           // return callback(err);
        }
        bcrypt.compare(password,user.password, function(err,result){
            if(err){
                return callback();
            } else {                
                return callback(null,user);
            }
        })
    })  

    
}

var User = mongoose.model('User', UserSchema);
module.exports = User;