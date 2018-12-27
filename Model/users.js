const bcrypt =  require('bcrypt');
const mongoose =  require('mongoose');

let UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : false,        
    },
    username : {
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
    },
    address : {
        type : String,
        required : false,        
    }
});


UserSchema.statics.authentication = (email, password, callback) =>{    
    User.findOne({email : email, password : password }).exec(function(err,user){
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
    req.session.destroy(function(err) {
        if(err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
    });    
    var ContactModel = mongoose.model('users',UserSchema);
    var contactModel = new ContactModel({
        name:userdata.name,
        email:userdata.email,
        password:userdata.password,
    });
    contactModel.save();    
}


UserSchema.statics.userprofiledata = (userId,callback) =>{    
    
    return User.findOne({_id : userId }).exec(function(err,user){
        if(err){
            return callback(err);
        } else if(!user) {
            var err = new Error('User is not exist');
            err.status = 401;
           // return callback(err);
        } else if(user) {
            //console.log('userprofiledata_userId->',user);
            return callback(null,user);
        }
      }) 
}

UserSchema.statics.userprofileupdate = (userdata,callback) =>{        
    console.log('User Update Data->',userdata);
    return User.updateOne({_id: userdata.uid},
    {
        name: userdata.user_name,
        address: userdata.address,
        email: userdata.email,
        Mobile: userdata.mobile,
        password: userdata.password,        
        
    }, function(err, docs){
        if(err) return json(err);
        //else    res.redirect('/user/'+req.params.id);
    });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;