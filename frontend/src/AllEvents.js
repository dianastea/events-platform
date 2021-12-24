import React, { useEffect, useState } from 'react';
import User from './UserEvents';
import Event from "./components/Event";
import InputEvent from "./components/InputEvent"; 
import InputTask from "./components/InputTask"; 
import TodoList from "./components/TodoList"; 
import { Grid, Paper, Typography, Divider } from "@material-ui/core";

import './App.css';
import { getAllEvents, getUserEvents, updateAttendees} from './services/UserService';

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
    const attendEvent = (e) => {
        const event_id = e.currentTarget.id; // id == event_id 
        console.log(e.currentTarget);
        console.log("id,", event_id);
        console.log("user_id", props.id); 

        // If the user  
        if (props.id != 0) {
            updateAttendees(props.id, event_id)
                .then(useEffect); 
        }

    }

    useEffect(() => {
        getAllEvents()
            .then(events => {
                setState({ ...state, events: events });
            })
        // getUserEvents(props.id)
        // .then(attending => {
        //     console.log(attending); 
        //     setState({...state, myEvents: attending}); 
        // })

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

export default AllEvents; 