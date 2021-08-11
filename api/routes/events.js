const { Router } = require('express'); 
const router = Router(); 
const pool = require('../db'); 
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

router.get('/tasks/:id', async (request, response, next) => {
    const { id } = request.params; 
    console.log('worked'); 
    await pool.query(`SELECT tasks.id, tasks.event_id, tasks.name, tasks.link FROM user_tasks JOIN tasks ON user_tasks.task_id=tasks.id WHERE user_tasks.user_id=${id}`, (err, res) => {
        if (err) return next(err); 
        response.json(res.rows); 
    })
})

router.get('/tasks', async (request, response, next) => {
    await pool.query('SELECT * FROM tasks', (err, res) => {
        if (err) return next(err);
        response.json(res.rows); 
    })
})


router.get('/:id', async (request, response, next) => {
    const { id } = request.params; 
    await pool.query(`SELECT * FROM events WHERE ID=${id}`, (err, res) => {
        if (err) return next(err); 
        response.json(res.rows); 
    })
})

router.get('/test/:user_id/:event_id', async (request, response, next) => {
    const {event_id, user_id} = request.params; 
    console.log(event_id, user_id); 
    await pool.query('SELECT * FROM attendees WHERE event_id=$1 AND user_id=$2', [event_id, user_id], (e4, r4) => {
        if (e4) return next(e4); 
        console.log(r4.rows.length); 
        response.json(r4.rows); 
    })
})

router.get('/user/:id', async (request, response, next) => {
    const { id } = request.params; 
    await pool.query(`SELECT events.id, events.name, events.time, events.description FROM attendees JOIN events ON attendees.event_name=events.name WHERE attendees.user_id = $1`, [id], (err, res) => {
        if (err) return next(err); 
        response.json(res.rows); 
    })
})

router.post('/', async (request, response, next) => {
    const {name, time, description} = request.body; 
    await pool.query('INSERT INTO events(name, time, description) VALUES ($1, $2, $3)', [name, time, description], (err, res) => {
        if (err) return next(err); 
        response.redirect('/events'); 
    } )
})

router.post('/task', async (request, response, next) => {
    var {event_id, eventName, taskName, link} = request.body; 


    // FIND THE ID OF THE REQUESTED EVENT 
    await pool.query('SELECT id FROM events WHERE name=$1',[eventName], (err, res) => {
        if (err) return next(err); 
        event_id = res.rows[0].id; 
        
        // INSERT NEW TASK INTO TASKS 
        pool.query('INSERT INTO tasks(event_id, name, link) VALUES ($1, $2, $3)', [event_id, taskName, link], (err2, res2) => {
            if (err2) return next(err2); 
            
            // FIND ALL USERS FOR THE REQUESTED EVENT 
            pool.query(`SELECT user_id FROM attendees WHERE event_id=${event_id}`, (err3, res3) => {
                if (err3) return next(err3); 
                const users = res3.rows; 
                console.log("*******RES3.ROWS**********")
                console.log(res3.rows); 

                // FIND THE NEW TASK ID 
                pool.query('SELECT id from tasks', (err4, res4) => {
                    if (err4) return next(err4); 
                    console.log("*******RES4.ROWS**********")
                    console.log(res4.rows); 
                    const task_id = res4.rows[res4.rows.length-1].id; 
                    console.log("****TASK_ID***")
                    console.log(task_id); 
                    for (index in users) {
                        let user = users[index]; 
                        console.log(user, user.user_id); 

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

// TOGGLES THE STATUS OF COMPLETION OF A PARTICULAR TASK FOR A PARTICULAR USER 
router.put('/completed/:user_id/:task_id', async (request, response, next) => {
    const { user_id, task_id } = request.params; 
    await pool.query('SELECT * FROM user_tasks WHERE user_id=$1 AND task_id=$2', [user_id, task_id], (err, res) => {
        if (err) return next(err); 
        console.log(res.rows[0]); 
        var { completed } = res.rows[0]; 
        if (completed == null) { console.log("ANNOYING)!"); completed = true; } 
        else console.log(completed); 
        pool.query('UPDATE user_tasks SET completed=$1 WHERE user_id=$2 AND task_id=$3', [!completed, user_id, task_id], (err2, res2) => {
            if(err2) return next(err2); 
            pool.query("SELECT * FROM user_tasks", (e,r) => {
                if (e) return next(e); 
                response.json(r.rows); 
            })
        })
    })

})


// UPDATED VERSION

// SELECT tasks.info WHERE tasks.event_id = event.id AND event.name=attendees.event_name WHERE attendees.user_id=$1, USER_ID 

router.get('/utasks/:id', async (request, response, next) => {
    const user_id = request.params.id; 
    // FILTER ATTENDEES FOR EVENTS WITH USER ID 
    pool.query(`SELECT tasks.name, tasks.link, tasks.id FROM attendees INNER JOIN tasks ON attendees.event_id=tasks.event_id WHERE attendees.user_id=${user_id}`, (err, res) => {
        if (err) return next(err); 

        // LOG RESPONSE FROM LATEST QUERY 
        console.log("**********TASKS***********")
        console.log(res.rows); 
        response.json(res.rows); 
                        
    })
})

// THE ABOVE CODE ELIMINATES NEED FOR USER_TASKS TABLE -- which is probably better because then you don't have 500 tables 


// WHEN ADDING EVENT TO USER, JUST ADD AN ATTENDEES ENTRY 
// WHEN ADDING TASK TO EVENT, JUST ADD THE TASK TO TASKS 



// ISSUES OF DUPLICATE USER_EVENTS AND USER_TASKS SOLVED BY ELIMINATING DUPLICATE CALLS TO THE BELOW API CALL
router.post('/attendees/:user_id/:event_id', async (request, response, next) => {
    const { user_id, event_id} = request.params; 
    // console.log("post request:",id,event_id) 

    // FIND ALL THE EVENT NAMES CORRESPONDING TO THE REQ. EVENT 
    await pool.query(`SELECT name, id FROM events WHERE id=${event_id}`, (err, res) => {
        if (err) return next(err); 
        console.log(res.rows); 
        const {name, id} = res.rows[0]; 

        // INSERT THE EVENT,USER PAIR INTO ATTENDEES 
        // CHECK FOR DUPLICATES: SELECT ename, eid, uid FROM attendees WHERE event_name=$1, event_id=$2, user_id=$3... 
        
        
        pool.query('SELECT * FROM attendees WHERE event_id=$1 AND user_id=$2', [event_id, user_id], (e4, r4) => {
            if (e4) return next(e4); 

            if (r4.rows.length > 0) response.redirect('/'); 
            else {
                pool.query(`INSERT INTO attendees(event_name, event_id, user_id) VALUES ($1, $2, $3)`, [name, id, user_id], (e, r) => {
                    if (e) return next(e); 
        
                    // Insert all tasks related to that event into the user_tasks 
                    // SELECT tasks.id FROM events JOIN tasks ON tasks.event_id=events.id WHERE events.id=${id}
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
                        response.redirect(`/events/tasks/${user_id}`)
        
                    })            
                })
            }
        })
    })

})




router.post('/tasks', async (request, response, next) => {
    const {event_id, name, link} = request.body; 
    await pool.query('INSERT INTO tasks(event_id, name, link) VALUES ($1, $2, $3)', [event_id, name, link], (err, res) => {
        if (err) return next(err); 
        response.redirect('/events/tasks'); 
    })
})



// router.post('/attendees/:ids', (request, response, next) => {
//     var { ids } = request.params; 
//     ids = ids.split("-"); 
//     const [id, event_id] = ids; 
//     console.log("AGHAGHAGHAGHAGH",id,event_id); 

//     // 1/2 QUERIES 
//     pool.query(`SELECT name FROM events WHERE id=${event_id}`, (err, res) => {
//         if (err) return next(err); 
//         console.log('res',res); 
//         const name = res.rows[0].name; 
//         console.log("NAME:",name); 
//         pool.query('INSERT INTO attendees(event_name, user_id) VALUES ($1, $2)', [name, id], (error, res2) => {
//             if (error) return next(error); 
//             response.redirect('/attendees'); 
//         } )
//     })

// })

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



// delete and put methods (put later)

module.exports = router; 



// FAILS
/*
router.get('/utasks/:id', async (request, response, next) => {
    const user_id = request.params.id; 
    // FILTER ATTENDEES FOR EVENTS WITH USER ID 
    pool.query('SELECT events.id FROM attendees JOIN events ON attendees.event_name=events.name WHERE attendees.user_id=$1', [user_id], (err, res) => {
        if (err) return next(err); 
        const myEvents = res.rows; 

        // LOG RESPONSE FROM LATEST QUERY 
        console.log("**********EVENTS W/ USER ID***********")
        console.log(myEvents); 
        
         // FILTER TASKS WITH EVENT_ID 
        pool.query('SELECT tasks.name, tasks.link FROM myEvents JOIN tasks ON myEvents.id=tasks.event_id', (e, r) => {
            if (e) return next(e); 
            console.log('*******RESPONSE******')
            console.log(r.rows); 
            response.json(r.rows); 
        })
                        
    })
})
*/