import React, { useEffect, useState } from 'react';
import Group from "./components/Group";
import { Grid, Paper, Typography, Divider } from "@material-ui/core";

import './App.css';
import { getAllGroups, joinGroup } from './services/UserService';

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr)",
    gridGap: "10px",
    gridAutoRows: "1fr",
    justifyItems: "stretch"
};

export default function AllGroups(props) {
    const [state, setState] = useState({
        groups: []
    });

    // ALL THE JS FUNCTIONS

    // When a user presses "Attend" on an Event in "All Events," the 
    const join = (e) => {
        const group_name = e.currentTarget.name; 
        console.log('JOINING', e.currentTarget);
        console.log("group name,", group_name);
        console.log("user_id", props.user_id); 
        joinGroup(group_name, props.user_id)
    }

    useEffect(() => {
        getAllGroups()
            .then(groups => {
                setState({ ...state, groups: groups });
            })
    })

    return (
        <div>
        
            {/* <TodoList user_id={props.id}/>  */}
            <div className='allEvents'>
                <Typography variant="h2" style={{marginTop: "10px"}}>
                    All Groups
                </Typography>
                <Grid style={grid}>
                    {state.groups.map((group, index) => (
                        <Group
                            group={group}
                            key={index}
                            user_id={props.user_id}
                            name={group.name}
                            image="https://source.unsplash.com/random/300x300?v=4"
                            join={join}
                            joined={false}
                        />
                    ))}
                </Grid>
            </div>

        </div>
    )
}

