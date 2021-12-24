import React, { useEffect, useState } from 'react';
import Event from "./components/Event"; 
import { Typography, Grid} from "@material-ui/core"; 
import AbortController from 'abort-controller';

import logo from './logo.svg';

import './App.css';
import { getUserEvents } from './services/UserService';

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr)",
  gridGap: "10px",
  gridAutoRows: "1fr",
  justifyItems: "stretch"
};

function UserEvents(props) {
  const [events, setEvents] = useState([]); 
  
  // guessing this is for componentDidMount ?? 
  useEffect(() => {
    // NEEDED? - AbortController 
    // const abortController = new AbortController(); 
    // const signal = abortController.signal; 


    // id = user id 
    getUserEvents(props.id)
    .then(events => {
      console.log('user events (useEffect)',events); 
      setEvents(events); 
    })
  })

  return (
    <div> 
        <Typography
        variant="h2"
        style={{marginTop: "10px"}}>
        My Events
      </Typography>
      <Grid style={grid}>
      {events.map((event, index) => (
        <Event
            event={event}
            id={index}
            image="https://source.unsplash.com/random/300x300?v=4"
            attending={true}
        /> 
      ))}
      </Grid>
      
    </div> 
  )
}

export default UserEvents; 