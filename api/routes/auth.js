const { Router } = require('express'); 
const router = Router(); 
const session = require('express-session'); 
const passport = require('passport'); 
const pool = require('../db'); 

router.use(session({
  secret: "Our little secret.", 
  resave: false, 
  saveUninitialized: true
}))

// INITIALIZE PASSPORT PACKAGE
router.use(passport.initialize()); 
// USE PASSPORT TO CONFIGURE SESSIONS
router.use(passport.session()); 

// router.use(CREATESTRATEGY???)

passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

// necessary for sessions
// serialize = creates cookie w/ user's identifications
// deserialize = allows passport to decode idenficiations (so we can authenticate them)