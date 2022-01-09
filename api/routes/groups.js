const { Router } = require('express'); 
const { query } = require('../db');
const router = Router(); 
const pool = require('../db'); 
const { password } = require('../secrets/db_configuration');

router.get('/', async (request, response, next) => {
    await pool.query('SELECT * FROM groups', (err, res) => {
        if (err) return next(err);
        // response.send(JSON.parse(res.rows));  
        response.json(res.rows); 
    })
})

router.get('/users', async (request, response, next) => {
    await pool.query('SELECT * FROM group_users', (err, res) => {
        if (err) return next(err);
        // response.send(JSON.parse(res.rows));  
        response.json(res.rows); 
    })
})


router.post('/', async (request, response, next) => {
    const {name, description, user_id} = request.body; 
    console.log(request.body)
    await pool.query('INSERT INTO groups(name, description, admin_id) VALUES ($1, $2, $3)', [name, description, user_id], async (err, res) => {
        if (err) return next(err)
        await pool.query('INSERT INTO group_users(group_name, user_id, admin) VALUES ($1, $2, $3)', [name, user_id, true], async (err2, res2) => {
            if (err2) return next(err2); 
            response.redirect('/')
        })
    })
})

router.post('/join', async (request, response, next) => {
    const {group_name, user_id} = request.body
    console.log('join logged', group_name, user_id, request.body)
    await pool.query('INSERT INTO group_users(group_name, user_id, admin) VALUES ($1, $2, $3)', [group_name, user_id, false], (err, res) => {
        if (err) return next(err)
        response.redirect('/')
    })
})

module.exports = router; 
