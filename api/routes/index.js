// import all those things
const { Router } = require('express'); 
const events = require('./events'); 
// const users = require('./auth'); 

const router = Router(); 
router.use('/auth', users); 
router.use('/events', events); 

module.exports = router; 