import React, { Fragment, useState } from "react";
import {Input, Button} from '@material-ui/core';
import { Grid, Paper, Typography } from "@material-ui/core";


const form = {
    display: "grid", 
    gridTemplateColumns: "1fr", 
    gridGap: "10px", 
    borderRadius: "5px",
    padding: "15px",
    margin: "20px 0 20px 0",
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
}

const InputEvent = (props) => {
  const [state, setState] = useState({
      eventName: "", 
      taskName: "",
      link: ""
  });

  const onSubmitForm = async e => {
    e.preventDefault();
    console.log("worked")
    try {
      const body = state;
      const response = await fetch(`/events/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      // what is below?? 
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (e) => {
      const {name, value} = e.target; 
      setState({...state, [name]: value}); 
  }

  return (
    <Fragment>
        
        <form noValidate autoComplete="off" style={form} onSubmit={onSubmitForm}>
        <Typography
                    variant="h4">
                    Submit a Task
                </Typography>
            <Input placeholder="Event Name" name="eventName" value={state.eventName} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} />
            <Input placeholder="Task Name" name="taskName" value={state.taskName} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} />
            <Input placeholder="Link" name="link" value={state.link} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} />
            <Button color="secondary" variant="contained" onClick={onSubmitForm} type="submit"> Add Task </Button>        
        </form>
      
    </Fragment>
  );
};

export default InputEvent;
