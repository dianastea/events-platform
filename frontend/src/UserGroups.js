import React, { useEffect, useState } from 'react';
import Group from "./components/Group"; 
import { Typography, Grid} from "@material-ui/core"; 
import './App.css';
import useUserGroups from './services/userGroups';
import useUserInfo from './services/userInfo';

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr)",
  gridGap: "10px",
  gridAutoRows: "1fr",
  justifyItems: "stretch"
};

function UserGroups(props) {
  // CHECK PROPS

  // const user_id = useUserInfo().id
  // console.log(user_id)
  const groups = useUserGroups(props.user_id) 
  // DO I NEED? try with and without, check how much parent re-renders
  console.log(groups) 

  return (
    <div> 
        <Typography
        variant="h2"
        style={{marginTop: "10px"}}>
        My Groups
      </Typography>
      <Grid style={grid}>
      {groups.map((group, index) => (
        <Group
            group={group}
            name={group.name}
            id={props.user_id}
            image="https://source.unsplash.com/random/300x300?v=4"
            joined={true}
            key={index}
        /> 
      ))}
      </Grid>
      
    </div> 
  )
}

export default UserGroups; 