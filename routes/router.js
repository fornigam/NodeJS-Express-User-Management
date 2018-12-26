var express = require('express');
var router = express.Router();
var User = require('../Model/users');


// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/template/index.html'));
});

router.post('/',(req,res)=>{
  //console.log('Data-0>',req.body);
  //console.log('Data-0>',(req.body.logemail && req.body.logpassword));
  if(req.body.logemail && req.body.logpassword){
    //console.log('Data-1>',User);
    User.authentication(req.body.logemail,req.body.logpassword,function(err,result){
      console.log('Data-2>',result.id);
        if(err || !result){
          //console.log('Data-3>',req.body);
          var err = new Error('Wrong email');
          return next(err);
        } else {
          console.log("Sesseion value->", req.session);
          //console.log("Request value->", req);
          req.session.userId = result.id;
          return res.redirect('/profile');
        }
    })
  }

})

router.post('/register',(req,res)=>{
  console.log('Data-0>',req.body);
  if(req.body.email && req.body.password){
    User.registration(req.body,function(err,result){

    });
  }

});


router.get('/profile', function (req, res, next) {
  console.log('Profile page called');
  res.render('profile', {
    title: 'Home',    
  });
  
})
router.get('/register', function (req, res, next) {
  console.log('Register page called');
  res.render('register', {
    title: 'Home',    
  });
  
})

module.exports = router;

