// works fine 
export async function getAllEvents() {
    try {
        const response = await(fetch('/events')); 
        return response.json(); 
    } catch (error) {
        return []; 
    }
}

export async function getAllGroups() {
    try {
        const response = await(fetch('/groups')); 
        return response.json(); 
    } catch (error) {
        return []; 
    }
}

// ADD EVENT,USER ENTRY 
export async function checkGroupMembership(user_id, group_name) {
    try {
        const response = await(fetch(`/groups/check/${user_id}/${group_name}`))

        /*
        , {
            method: 'GET', 
            headers: {'Content-Type': 'applications/json'}, 
            body: JSON.stringify({'user_id': user_id, 'group_name': group_name})
        } */
        return response.json(); 
    } catch (error) {
        return error
    }
}


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
export async function getUserInfo() {
    try {
        const response = await(fetch('/users/userInfo')); 
        return response.json(); 
    } catch (error) {
        return error; 
    }
}

// CHANGED FETCH ROUTE 
// GET USER'S EVENTS 
export async function getUserEvents(id) {
    try {
        const response = await(fetch(`/users/events/${id}`))
        return response.json(); 
    } catch (error) {
        return error; 
    }
}

export async function getUserAdminGroups(id) {
    try {
        const response = await(fetch(`/groups/admin/${id}`))
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
        body: JSON.stringify(data)
    })

    return await response.json(); 
}

export async function createGroup(data) {
    const response = await fetch('/groups', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await response.json(); 
}

export async function joinGroup(group_name, user_id) {
    try {
        const response = await fetch('/groups/join', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'group_name': group_name, 'user_id': user_id})
        })
        return response.json(); // JSON()???? 
    } catch (error) {
        return error; 
    }
}