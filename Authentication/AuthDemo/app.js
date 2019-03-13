var express = require("express");
var    app     = express();
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/auth_demo_app', {useNewUrlParser: true});

var passport = require("passport")
var bodyParser = require("body-parser")
var localstrategy = require("passport-local")
var passportLocalMongoose = require("passport-local-mongoose")
var User = require("./models/user")
var expressSession = require("express-session")
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))

app.use(expressSession({
    secret:' a secret cat',
    resave:false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new localstrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}


//start listening 
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('server has started')
})

//==============
//ROUTE
//===============

// home page 
app.get('/', function(req, res){
    res.render('home')
})


// secrete route
app.get('/secret', isLoggedIn, function(req, res){
    res.render('secret');
})

//auth route 
//show register form
app.get('/register', function(req, res) {
    res.render('register');
})

// handing register form 
app.post('/register', function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log('there is a err')
            console.log(err)
            return res.render('register')
        } else {
            console.log('No err!!')
            passport.authenticate("local")(req, res, function(){
                res.redirect('/secret')
            });
        }
    })
})

// login routes
// login form
app.get("/login", function(req, res) {
    res.render('login');
});

// login logic
app.post("/login", passport.authenticate("local", {
    successRedirect:"/secret",
    failureRedirect:"/login"
}), function(req, res) {
});


//logout

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
