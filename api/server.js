const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const routes = require('./routes'); 
const server = express(); 

server.use(bodyParser.json()); 
server.use(bodyParser.urlencoded({extended: true})); 
server.use('/', routes); 
// DIFFERENCE: app.use(express.json()); //req.body


// ERROR HANDLING 
server.use((err, req, res, next) => {
    res.json(err); 
})

module.exports = server; 