const { Router } = require('express'); 
const { query } = require('../db');
const router = Router(); 
const pool = require('../db'); 
const { password } = require('../secrets/db_configuration');
// const event = require('../components/Event'); 

// *** CHANGES ***
//  Added all the ASYNC and AWAIT keywords 


router.get('/', async (request, response, next) => {
    await pool.query('SELECT * FROM events', (err, res) => {
        if (err) return next(err);
        // response.send(JSON.parse(res.rows));  
        response.json(res.rows); 
    })
})


// COMMENT OUT
router.get('/usertasks/:user_id', async (request, response, next) => {
    const { user_id } = request.params; 
    await pool.query('SELECT user_tasks.completed, tasks.id, tasks.name, tasks.link, tasks.event_id FROM user_tasks JOIN tasks ON user_tasks.task_id=tasks.id WHERE user_tasks.user_id=$1', [user_id], (err, res) => {
        if (err) return next(err); 
        response.json(res.rows); 
    })
})

router.get('/attendees', async (request, response, next) => {
    await pool.query('SELECT * FROM attendees', (err, res) => {
        if (err) return next(err);
        // response.send(JSON.parse(res.rows));  
        response.json(res.rows); 
    })
})

router.get('/admin/:admin_id', async (request, response, next) => {
    const {admin_id} = request.params 
    var events = [] 

    await pool.query('SELECT * FROM groups WHERE admin_id=$1', [admin_id], (err, res) => {
        if (err) return next(err)
        const groups = res.rows 
        console.log('GROUPS', groups)
        groups.map(async (group, index) => {
            await pool.query('SELECT * FROM events WHERE group_name=$1', [group.name], (err2, res2) => {
                if (err2) return next(err2)
                console.log('2ND QUERY', group.name, res2.rows)
                res2.rows.forEach((event) => {events.push(event)})
                if (index == groups.length - 1) response.json(events)
            })
        })
    })

})

// DUPLICATE OF USERTASKS/:USER_ID -- think it doesn't work because of the str literal -- delete later
router.get('/tasks/:id', async (request, response, next) => {
    const { id } = request.params; 
    await pool.query(`SELECT tasks.id, tasks.event_id, tasks.name, tasks.link FROM user_tasks JOIN tasks ON user_tasks.task_id=tasks.id WHERE user_tasks.user_id=${id}`, (err, res) => {
        if (err) return next(err); 
        response.json(res.rows); 
    })
})


// GET ALL TASKS 
router.get('/tasks', async (request, response, next) => {
    await pool.query('SELECT * FROM tasks', (err, res) => {
        if (err) return next(err);
        response.json(res.rows); 
    })
})

// TOGGLES THE STATUS OF COMPLETION OF A PARTICULAR TASK FOR A PARTICULAR USER 
router.get('/completed/:user_id/:task_id', async (request, response, next) => {
    const { user_id, task_id } = request.params; 
    await pool.query('SELECT * FROM user_tasks WHERE user_id=$1 AND task_id=$2', [user_id, task_id], (err, res) => {
        if (err) return next(err); 
        var { completed } = res.rows[0]; 
        if (completed == null) { completed = true; }
        else completed = completed 
        pool.query('UPDATE user_tasks SET completed=$1 WHERE user_id=$2 AND task_id=$3', [!completed, user_id, task_id], (err2, res2) => {
            if(err2) return next(err2); 
            pool.query("SELECT * FROM user_tasks", (e,r) => {
                if (e) return next(e); 
                response.json(r.rows); 
            })
        })
    })

})

// GET EVENT BY ID 
router.get('/:id', async (request, response, next) => {
    const { id } = request.params; 
    await pool.query(`SELECT * FROM events WHERE ID=${id}`, (err, res) => {
        if (err) return next(err); 
        response.json(res.rows); 
    })
})

// SELECT SPECIFIC ENTRY IN ATTENDEES
router.get('/test/:user_id/:event_id', async (request, response, next) => {
    const {event_id, user_id} = request.params; 
    await pool.query('SELECT * FROM attendees WHERE event_id=$1 AND user_id=$2', [event_id, user_id], (e4, r4) => {
        if (e4) return next(e4); 
        response.json(r4.rows); 
    })
})


// ALL EVENTS FOR SPECIFIC USER 
router.get('/user/:id', async (request, response, next) => {
    const { id } = request.params; 
    await pool.query(`SELECT events.id, events.name, events.time, events.description FROM attendees JOIN events ON attendees.event_name=events.name WHERE attendees.user_id = $1`, [id], (err, res) => {
        if (err) return next(err); 
        response.json(res.rows); 
    })
})


// ADD AN EVENT 
router.post('/', async (request, response, next) => {
    const {name, group_name, time, description} = request.body; 
    console.log('INSERT INTO EVENTS', request.body)
    await pool.query('INSERT INTO events(name, group_name, time, description) VALUES ($1, $2, $3, $4)', [name, group_name, time, description], (err, res) => {
        if (err) return next(err); 
        response.redirect('/events'); 
    } )
})


// INSERT A TASK 
router.post('/task', async (request, response, next) => {
    var {event_id, event_name, task_name, link} = request.body; 


    // FIND THE ID OF THE REQUESTED EVENT 
    await pool.query('SELECT id FROM events WHERE name=$1',[event_name], (err, res) => {
        if (err) return next(err); 
        if (res.rows.length == 0) return next(err); 
        event_id = res.rows[0].id; 
        
        // INSERT NEW TASK INTO TASKS 
        pool.query('INSERT INTO tasks(event_id, name, link) VALUES ($1, $2, $3)', [event_id, task_name, link], (err2, res2) => {
            if (err2) return next(err2); 
            
            // FIND ALL USERS FOR THE REQUESTED EVENT 
            pool.query(`SELECT user_id FROM attendees WHERE event_id=${event_id}`, (err3, res3) => {
                if (err3) return next(err3); 
                const users = res3.rows; 
                // console.log("*******RES3.ROWS**********")
                // console.log(res3.rows); 

                // FIND THE NEW TASK ID 
                pool.query('SELECT id from tasks', (err4, res4) => {
                    if (err4) return next(err4); 
                    // console.log("*******RES4.ROWS**********")
                    // console.log(res4.rows); 
                    const task_id = res4.rows[res4.rows.length-1].id; 
                    // console.log("****TASK_ID***")
                    // console.log(task_id); 
                    for (index in users) {
                        let user = users[index]; 
                        // console.log(user, user.user_id); 

                        // FOR EACH USER, INSERT TASK INTO THE USER'S TASKS 
                        pool.query('INSERT INTO user_tasks(user_id, task_id, completed) VALUES ($1, $2, $3)', [user.user_id, task_id, false], (err5, res5) => {
                            if (err5) return next(err5); 
                        })
                    }
                    response.redirect("/events"); 
                })
                
            })
            
        } )
    })
})


// WHEN ADDING EVENT TO USER, JUST ADD AN ATTENDEES ENTRY 
// WHEN ADDING TASK TO EVENT, JUST ADD THE TASK TO TASKS 


// ISSUES OF DUPLICATE USER_EVENTS AND USER_TASKS SOLVED BY ELIMINATING DUPLICATE CALLS TO THE BELOW API CALL

// ADD ATTENDEES ENTRY 
router.post('/attendees/:user_id/:event_id', async (request, response, next) => {
    const { user_id, event_id} = request.params; 

    // FIND THE EVENT 
    await pool.query(`SELECT name, id FROM events WHERE id=${event_id}`, (err, res) => {
        if (err) return next(err); 
        // console.log(res.rows); 
        const {name, id} = res.rows[0]; 

        // CHECK EXISTING ENTRY  
        pool.query('SELECT * FROM attendees WHERE event_id=$1 AND user_id=$2', [event_id, user_id], (e4, r4) => {
            if (e4) return next(e4); 

            if (r4.rows.length > 0) response.redirect('/'); 
            else {
                // INSERT NEW ATTENDEES ENTRY 
                pool.query(`INSERT INTO attendees(event_name, event_id, user_id) VALUES ($1, $2, $3)`, [name, id, user_id], (e, r) => {
                    if (e) return next(e); 
        
                    // FIND EVENT'S TASKS 
                    pool.query('SELECT tasks.id FROM events JOIN tasks ON tasks.event_id=events.id WHERE events.id=$1', [event_id], (e2, r2) => {
                        if (e2) return next(e2); 
                        const tasks = r2.rows; 
                        
                        // foreach(task:tasks) INSERT INTO user_tasks(user_id, task_id, completed) 
                        for (index in tasks) {
                            const task = tasks[index]; 
                            pool.query('INSERT INTO user_tasks(user_id, task_id, completed) VALUES ($1,$2,$3)', [user_id, task.id, false], (e3, r3) => {
                                if (e3) return next(e3); 
                            })
                        }
                        
                        // SELECTING ALL TASKS CORRESPONDING TO THE REQ. EVENT 
                        response.redirect(`/users/tasks/${user_id}`)
        
                    })            
                })
            }
        })
    })

})


// INSERT NEW TASK
router.post('/tasks', async (request, response, next) => {
    const {event_id, name, link} = request.body; 
    await pool.query('UPDATE tasks(event_id, name, link) VALUES ($1, $2, $3)', [event_id, name, link], (err, res) => {
        if (err) return next(err); 
        response.redirect('/events/tasks'); 
    })
})

// UPDATE EVENT 
router.put('/:id', (request, response, next) => {
    const { id } = request.params; 
    const keys = ['name', 'time', 'description']; 
    const fields = []; 

    keys.forEach(key => {
        if (request.body[key]) fields.push(key); 
    })

    // had error here when I did not use (field, index)

    fields.forEach((field, index) => {
        pool.query(`UPDATE events SET ${field}=$1 WHERE id=$2`, [request.body[field],id], (err, res) => {
            if (err) return next(err); 
            if (index == fields.length - 1) response.redirect('/events'); 
        })
    })
})



router.delete('/:id', (request, response, next) => {
    const { id } = request.params; 
    pool.query('DELETE FROM events WHERE id=$1', [id], (err, res) => {
        if (err) return next(err); 
        response.redirect('/events'); 
    })
})


module.exports = router; 
