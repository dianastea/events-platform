const initPassport = require('../controllers/passportController'); 
const { Router } = require('express'); 
const router = Router(); 
const loginController = require('../controllers/loginController'); 
const passport = require('passport'); 

// initPassport(); 

router.get('/', loginController.checkLoggedIn, (req, res) => {
  console.log('using auth.js')
  return res.render({user: req.user}); 
})

// BELOW METHOD SHOULD BE POST 
// router.get("/login", passport.authenticate('google', { scope: ['profile', 'email'], successReturnToOrRedirect: '/auth'}));

module.exports = router; 

/* CHANGES 
1. commented out initPassport() in auth.js because function called in server.js 
2. removed successRedirect in server.../auth/google params 
3. commented osut /login in auth.js and /good in server.js
*/