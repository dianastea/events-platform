const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const passport = require('passport'); 
const routes = require('./routes'); 
const server = express(); 

server.use(bodyParser.json()); 
server.use(bodyParser.urlencoded({extended: true})); 
server.use('/', routes); 
// DIFFERENCE: app.use(express.json()); //req.body

// // IDK WHAT THIS IS
// server.use(function(req, res, next){
//     res.locals.message = req.flash('message');
//     next();
// });

// ERROR HANDLING 
server.use((err, req, res, next) => {
    res.json(err); 
})

module.exports = server; 