import React, { useEffect, useState } from 'react';
import User from './UserEvents';
import Event from "./components/Event";
import InputEvent from "./components/InputEvent"; 
import InputTask from "./components/InputTask"; 
import TodoList from "./components/TodoList"; 
import { Grid, Paper, Typography, Divider } from "@material-ui/core";

import './App.css';
import { getAllEvents, getUserEvents, updateAttendees, checkGroupMembership} from './services/UserService';

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr)",
    gridGap: "10px",
    gridAutoRows: "1fr",
    justifyItems: "stretch"
};

function AllEvents(props) {
    const [state, setState] = useState({
        events: []
    });

    // ALL THE JS FUNCTIONS

    // When a user presses "Attend" on an Event in "All Events," the 
    const attendEvent = async (e) => {
        const [event_id, group_name] = e.currentTarget.id.split(",")
        console.log("AGHAGHAGH,", event_id, group_name, e.currentTarget.id);
        console.log("user_id", props.id); 

        const checked = await checkGroupMembership(props.id, group_name)
        console.log(checked, checked.length)
        if (checked.length > 0) {
            // membership confirmed
            updateAttendees(props.id, event_id)
        }
    }

    useEffect(() => {
        getAllEvents()
            .then(events => {
                setState({ ...state, events: events });
            })

    })

    return (
        <div>
        
            {/* <TodoList user_id={props.id}/>  */}
            <div className='allEvents'>
                <Typography variant="h2">
                    All Events
                </Typography>
                <Grid style={grid}>
                    {state.events.map((event, index) => (
                        <Event
                            event={event}
                            key={index}
                            id={event.id}
                            group_name={event.group_name}
                            image="https://source.unsplash.com/random/300x300?v=4"
                            attendEvent={attendEvent}
                            attending={false}
                        />
                    ))}
                </Grid>
            </div>

        </div>
    )
}

export default AllEvents