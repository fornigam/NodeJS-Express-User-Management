var express = require('express');
var router = express.Router();
var User = require('../Model/users');


// GET route for reading data
router.get('/', function (req, res, next) {
  //return res.sendFile(path.join(__dirname + '/template/index.pug'));
  res.render('index', {
    title: 'User Registration',    
  });  
});

router.post('/',(req,res)=>{  
  if(req.body.logemail && req.body.logpassword){    
    User.authentication(req.body.logemail,req.body.logpassword,function(err,result){      
        if(err || !result){          
          var err = new Error('Wrong email');
          return next(err);
        } else {          
          req.session.userId = result.id;          
          return res.redirect('/profile');
        }
    })
  }

})

router.post('/register',(req,res)=>{  
  if(req.body.email && req.body.password){
    User.registration(req.body,function(err,result){

    });
  }

});

router.post('/profile',(req,res)=>{  
  if(req){
    User.userprofileupdate(req.body,function(err,result){
    });
  }

});


router.get('/profile', function (req, res, next) {  
  if(req.session.userId){
    User.userprofiledata(req.session.userId,function(err,user){
      userdata = user;    
      res.render('profile', {
        welcome_txt: 'Welcome ',    
        session_val: req.session.userId,      
        username : userdata.username,
        name : userdata.name,
        email : userdata.email,
        mobile : userdata.mobile,
        address : userdata.address,
      });
    })
    
  }  else {
    res.redirect('/');
  }
  
  
})

router.get('/register', function (req, res, next) {    
  res.render('register', {
    title: 'User Registration',    
  });  
})

module.exports = router;

