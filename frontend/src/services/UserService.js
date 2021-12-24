// works fine 
export async function getAllEvents() {
    try {
        const response = await(fetch('/events')); 
        return response.json(); 
    } catch (error) {
        return []; 
    }
}

// ADD EVENT,USER ENTRY 
export async function updateAttendees(user_id, events_id) {
    try {
        const response = await(fetch(`/events/attendees/${user_id}/${events_id}`, {
            method: 'POST', 
            headers: {'Content-Type': 'applications/json'}
        })); 
        return response.json(); // JSON()???? 
    } catch (error) {
        return error; 
    }
}

// GET USER INFO
export async function getUserInfo(signal) {
    try {
        const response = await(fetch('/users/userInfo', {signal: signal})); 
        return response.json(); 
    } catch (error) {
        console.log("USER INFO ERROR"); 
        return error; 
    }
}

// CHANGED FETCH ROUTE 
// GET USER'S EVENTS 
export async function getUserEvents(id) {
    try {
        console.log(`USER EVENTS ID: ${id}`)
        const response = await(fetch(`/users/events/${id}`))
        // const response = await(fetch(`/events/user/${id}`)); 
        return response.json(); 
    } catch (error) {
        return error; 
    }
}

// GET USER'S TASKS 
export async function getUserTasks(user_id) {
    try {
        const response = await(fetch(`/users/tasks/${user_id}`));
        return response.json(); 
    } catch (error) {
        console.log("USER TASKS ERROR")
        return error; 
    }
}

export async function completeUserTask(user_id, task_id) {
    try {
        const response = await(fetch(`/events/completed/${user_id}/${task_id}`)); 
        return response.json(); 
    } catch (error) {
        console.log("COMPLETE USER TASK ERROR")
        return error; 
    }
}

// WHAT??? 
export async function createEvent(data) {
    const response = await fetch('/events', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({event: data})
    })

    return await response.json(); 
}