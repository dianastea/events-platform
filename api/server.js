const express = require('express'); 
const session = require('express-session'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const cookieParser = require('cookie-parser'); 
const passport = require('passport'); 
const routes = require('./routes'); 
const initPassport = require('./controllers/passportController');


const server = express(); 


//use cookie parser
server.use(cookieParser('secret'));

//config session
server.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 86400000 1 day, 
        secure: false
    }
}));

server.use(passport.initialize()); 
server.use(passport.session()); 

server.use(bodyParser.json()); 
server.use(bodyParser.urlencoded({extended: true})); 


initPassport(); 

/****** DIFFERENT ********/ 
// require('./routes/auth'); 

server.use('/', routes); 

server.use((err, req, res, next) => {
    res.json(err); 
})

server.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
}); 

server.get('/', (req, res) => {
    res.send("HELLO WORLD")
})

server.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], successRedirect: '/auth/good'})); 

server.get('/auth/google/callback', 
passport.authenticate('google', {failureRedirect: '/failed', failureFlash: true, successFlash: false}), 
function (req, res) {
  // SUCCESSFUL AUTH - REDIRECT HOME 
  res.redirect("http://localhost:3000"); 
})

server.get('/failed', (req, res) => {
    res.send("YOU FAILED TO LOG IN")
})

// NEEDED? 
server.get('/good', (req, res) => { 
    console.log("GOOD")
    console.log(req.session); 
    if (!req.isAuthenticated()) {
        res.redirect('/auth/google'); 
    }
    else res.json(req.user); 
}); 


server.get('/logout', (req, res) => {
    console.log('LOGGING OUT')
    req.session.destroy(function(err) {
        if (err) console.log(err); 
        return res.redirect("http://localhost:3000"); 
    }); // destroys session 
})

module.exports = server; 