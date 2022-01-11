import React, { Fragment, useState } from "react";
import { Input, Button } from '@material-ui/core';
import { Grid, Paper, Typography } from "@material-ui/core";
import useAdminEvents from "../services/userAdminEvents";
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material';

const form = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridGap: "10px",
  borderRadius: "5px",
  padding: "15px",
  margin: "20px 0 20px 0",
  boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
}

const InputTask = (props) => {
  const adminEvents = useAdminEvents(props.user_id);
  const [state, setState] = useState({
    task_name: "",
    link: "",
    user_id: props.user_id, 
    event_name: adminEvents.length > 0 ? adminEvents[0].name : ''
  });

  const onSubmitForm = async e => {
    e.preventDefault();
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
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  return (
    <Fragment>

      <form noValidate autoComplete="off" style={form} onSubmit={onSubmitForm}>
        <Typography
          variant="h4">
          Submit a Task
        </Typography>
        <Input placeholder="Task Name" name="task_name" value={state.task_name} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} />
        <Input placeholder="Link" name="link" value={state.link} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} />
        <InputLabel id="demo-simple-select-label">Choose Event</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="event_name"
          value={state.event_name}
          label="Age"
          onChange={handleChange}
        >
          {adminEvents.map((event, index) => (
            <MenuItem value={event.name} key={index}> {event.name} </MenuItem>
          ))}
        </Select>
        <Button color="secondary" variant="contained" onClick={onSubmitForm} type="submit"> Add Task </Button>
      </form>

    </Fragment>
  );
};

export default InputTask;
