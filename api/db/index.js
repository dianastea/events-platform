const { Pool } = require('pg'); 
const { user, host, database, password, port } = require('../secrets/db_configuration'); 

// NEW CODE // 


const pool = new Pool({ user, host, database, password, port, dialect: "postgres",
pool: {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
} }); 

module.exports = pool; 