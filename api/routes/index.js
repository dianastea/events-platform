// import all those things
const { Router } = require('express'); 
const { routes } = require('../server');
const events = require('./events'); 
const groups = require('./groups'); 
const users = require('./users'); 
const auth = require('./auth'); 
const timeout = require('connect-timeout')


const router = Router(); 
router.use(timeout('25000')); 
router.use('/events', events); 
router.use('/users', users); 
router.use('/auth', auth); 
router.use('/groups', groups); 
// router.end('Hello World')

module.exports = router; 