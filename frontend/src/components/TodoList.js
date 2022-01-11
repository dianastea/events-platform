import React, {useState, useEffect} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Typography from '@material-ui/core/Typography'; 
import {completeUserTask, getUserTasks} from "../services/UserService"; 


export default function CheckboxList(props) {
    const [checked, setChecked] = useState([0]);
    const [tasks, setTasks] = useState([]); 

    useEffect(() => {
        // something w/ UserService
        getUserTasks(props.user_id)
        .then(userTasks => {
            setTasks(userTasks); 
        })

    })

  
    // change value of checked to be the value of task.completed 
    // then to toggle, don't need state anymore 
    const handleToggle = (e) => {
        console.log('TOGGLE TODO ****TARGET****',e.currentTarget.id, props.user_id); 
        const task_id = e.currentTarget.id 
        const user_id = props.user_id 
        completeUserTask(user_id, task_id)
        .then(
          console.log("SUCCESSSFUL!! ")
        )

    };
    
    const handleToggleNew = (e) => {
        e.preventDefault(); 
        // make request here 
        const { task_id } = e.currentTarget.id; 
        console.log("******TARGET*****",e); 
        try {
            const response = fetch(`/events/completed/${props.user_id}/${task_id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" }
            });
      
            // what is below?? 
            window.location = "/";
          } catch (err) {
            console.error(err.message);
          }
    }
  
    return (
      <List style={{maxWidth: "430px"}}>
        <Typography variant="h6">Your Tasks</Typography>
        {tasks.map((task, value) => { 
          const labelId = `checkbox-list-label-${value}`;
  
          return (
            <ListItem key={value} dense button id={task.id} onClick = {handleToggle}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={task.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    );
  }
