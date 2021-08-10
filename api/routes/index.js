// import all those things
const { Router } = require('express'); 
const events = require('./events'); 

const router = Router(); 
router.use('/events', events); 

module.exports = router; 