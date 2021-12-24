const { Router } = require('express'); 
const router = Router(); 
const pool = require('../db'); 
// const event = require('../components/Event'); 

// *** CHANGES ***
//  Added all the ASYNC and AWAIT keywords 


// ALL USERS
router.get('/', async (request, response, next) => {
    await pool.query('SELECT * FROM users', (err, res) => {
        if (err) return next(err);
        // response.send(JSON.parse(res.rows));  
        response.json(res.rows); 
    })
})

// GET THE USER 
router.get('/userInfo', async (req, res) => {
    res.json(req.user); 
})


// USER'S TASKS 
router.get('/tasks/:id', async (request, response, next) => {
    const { id } = request.params; 
    await pool.query(`SELECT tasks.id, tasks.event_id, tasks.name, tasks.link, user_tasks.completed FROM user_tasks JOIN tasks ON user_tasks.task_id=tasks.id WHERE user_tasks.user_id=${id} AND NOT user_tasks.completed`, (err, res) => {
        if (err) return next(err); 
        response.json(res.rows); 
    })
})


// USER'S EVENTS 
router.get('/events/:id', async (request, response, next) => {
    const { id } = request.params; 
    await pool.query(`SELECT events.id, events.name, events.time, events.description FROM attendees JOIN events ON attendees.event_name=events.name WHERE attendees.user_id = $1`, [id], (err, res) => {
        if (err) return next(err); 
        response.json(res.rows); 
    })
})



module.exports = router; 

