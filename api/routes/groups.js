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

router.get('/:user_id', async (request, response, next) => {
    await pool.query('SELECT * FROM group_users WHERE user_id=$1', [request.params.user_id], (err, res) => {
        if (err) return next(err)
        const entries = res.rows 
        const groups = []
        entries.forEach(async (entry, index) => {
            await pool.query('SELECT * FROM groups WHERE name=$1', [entry.group_name], (err2, res2) => {
                if (err2) return next(err2)
                res2.rows.forEach((group) => {
                    groups.push(group)
                })
                if (index == entries.length - 1) response.json(groups)
            })
        })
    })
})

router.get('/users', async (request, response, next) => {
    await pool.query('SELECT * FROM group_users', (err, res) => {
        if (err) return next(err);
        // response.send(JSON.parse(res.rows));  
        response.json(res.rows); 
    })
})

router.get('/admin/:user_id', async (request, response, next) => {
    await pool.query('SELECT * FROM group_users WHERE user_id=$1 AND admin=true', [request.params.user_id], (err, res) => {
        if (err) return next(err); 
        response.json(res.rows)
    })
})

router.get('/check/:user_id/:group_name', async (request, response, next) => {
    const {user_id, group_name} = request.params; 
    // console.log('CHECKING MEMBERSHIP', user_id, group_name)
    await pool.query('SELECT * FROM group_users WHERE group_name=$1 AND user_id=$2', [group_name, user_id], (err, res) => {
        if (err) return next(err); 
        response.json(res.rows); 
    })
})

router.post('/', async (request, response, next) => {
    const {name, description, user_id} = request.body; 
    console.log('INSERT INTO GROUPS', request.body)
    await pool.query('INSERT INTO groups(name, description, admin_id) VALUES ($1, $2, $3)', [name, description, user_id], async (err, res) => {
        if (err) return next(err)
        await pool.query('INSERT INTO group_users(group_name, user_id, admin) VALUES ($1, $2, $3)', [name, user_id, true], async (err2, res2) => {
            if (err2) return next(err2); 
            response.redirect('/groups')
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
