// import all those things
const { Router } = require('express'); 
const { routes } = require('../server');
const events = require('./events'); 
const users = require('./users'); 
const auth = require('./auth'); 

const router = Router(); 
router.use('/events', events); 
router.use('/users', users); 
// router.use('/auth', auth); 

module.exports = router; 