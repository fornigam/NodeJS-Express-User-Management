var express = require('express');
var session = require('express-session')
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
          //console.log('Data-4>',req.body);
          req.session.userId = result.id;
          return res.redirect('/profile');
        }
    })
  }

})

router.get('/profile', function (req, res, next) {
  console.log('Profile page calle');
  process.exit(1);  
})

module.exports = router;

