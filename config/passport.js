var passport=require('passport');
var User=require('../models/user');
var LocalStrategy=require('passport-local').Strategy;


passport.serializeUser(function (user,done) {
    done(null,user.id);
});


passport.deserializeUser(function (id,done) {
    User.findById(id,function (err,user) {
        done(err,user);
    });
});




passport.use('localsignup',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
},function (req,email,password,done) {

    User.findOne({'email':email},function (err,user) {

        req.checkBody('email','invalid Email').notEmpty().isEmail();
        req.checkBody('password','invalid Password').notEmpty().isLength({min:4});
        let errors=req.validationErrors();
        if(errors){
            let messages=[];
            errors.forEach((error)=>{
                messages.push(error.msg);
            });
            return done(null,false,req.flash('error',messages));
        }
        if(err){
            return done(err);
        }
        if(user){
            return done(null,false,{message:'Email is already in use.'});
        }
        var newUser=new User();
        newUser.email=email;
        newUser.password=newUser.encryptPassword(password);
        newUser.save(function (err,result) {
            if(err){
                return done(err);
            }
            return done(null,newUser);
        });

    });
}));




passport.use('localsignin',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},function (req,email,password,done) {

    User.findOne({'email':email},function (err,user) {

        req.checkBody('email','invalid Email').notEmpty().isEmail();
        req.checkBody('password','invalid Password').notEmpty().isLength({min:4});
        let errors=req.validationErrors();
        if(errors){
            let messages=[];
            errors.forEach((error)=>{
                messages.push(error.msg);
            });
            return done(null,false,req.flash('error',messages));
        }
        if(err){
            return done(err);
        }
        if(!user){
            return done(null,false,{message:'no user found.'});
        }
        if(!user.validPassword(password)){
            return done(null,false,{message:'wrong password.'});

        }
        return done(null,user);


    });
}));