var express = require('express');
var router = express.Router();

var csurf = require('csurf');
var csrfProtection=csurf();
var passport=require('passport');

var Product=require('../models/product');


router.use(csrfProtection);


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("test");
  let products=[];
  let product=Product.find(function(err,docs){
    products.push(docs);
    res.render('shop/index', { title: 'Express' ,products:products[0]});

  });


});

router.get('/user/signup', function(req, res, next) {
    res.render('user/signup', { csrftoken:req.csrfToken()});

});
router.post('/user/signup', passport.authenticate('localsignup',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/signup',
    failureFlash:true
}));

router.get('/user/profile', function(req, res, next) {
    res.render('user/profile');

});

module.exports = router;




/*

*/
