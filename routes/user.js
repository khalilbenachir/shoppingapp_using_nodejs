var express = require('express');
var router = express.Router();

var csurf = require('csurf');
var csrfProtection=csurf();
var passport=require('passport');
router.use(csrfProtection);

router.use('/user',isLoggedin,function (req, res, next) {
    next();
});

router.get('/profile', function(req, res, next) {
    res.render('user/profile');

});
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');

});

router.use('/',notLoggedin,function (req, res, next) {
    next();
});

router.get('/signup', function(req, res, next) {
    let messages=req.flash("error");
    res.render('user/signup', { csrftoken:req.csrfToken(),message:messages,hasError:messages.length>0});

});
router.post('/signup', passport.authenticate('localsignup',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/signup',
    failureFlash:true
}));


router.get('/signin', function(req, res, next) {
    let messages=req.flash("error");
    res.render('user/signin', { csrftoken:req.csrfToken(),message:messages,hasError:messages.length>0});

});

router.post('/signin', passport.authenticate('localsignin',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/signin',
    failureFlash:true
}));









module.exports = router;


function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
     res.redirect('/');

}

function notLoggedin(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');

}