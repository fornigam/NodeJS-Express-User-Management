const bcrypt =  require('bcrypt');
const mongoose =  require('mongoose');

let UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : false,        
    },
    email : {
        type : String,
        required : false,
        trim : true
    },
    mobile : {
        type : String,
        required : false,        
    },
    password : {
        type : String,
        required : false,        
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
UserSchema.statics.registration = (userdata,callback)=> {

    console.log("--User Data->",userdata);
    var ContactModel = mongoose.model('users',UserSchema);

        var contactModel = new ContactModel({
        name:userdata.name,
        email:userdata.email,
        password:userdata.password,
        });
        contactModel.save();
    /*var ContactModel = mongoose.model('users',contactdetails1);
    var contactModel = new ContactModel({
    name:req.body.name,
    email:req.body.email,
    password:'',
    mobile:req.body.number 
    })*/
}


UserSchema.statics.userupdate = (userdata,callback) =>{    

}

var User = mongoose.model('User', UserSchema);
module.exports = User;