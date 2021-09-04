const initPassport = require('../controllers/passportController'); 
const { Router } = require('express'); 
const router = Router(); 
const loginController = require('../controllers/loginController'); 
const passport = require('passport'); 

initPassport(); 

router.get('/', loginController.checkLoggedIn, (req, res) => {
  return res.render({user: req.user}); 
})
// router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);

// BELOW METHOD SHOULD BE POST 
router.get("/login", passport.authenticate('google', { scope: ['profile', 'email'], successReturnToOrRedirect: '/auth'}));

module.exports = router; 