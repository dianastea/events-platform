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



const InputEvent = () => {
  const [state, setState] = useState({
      name: "", 
      description: "", 
      time: ""
  });

  const onSubmitForm = async e => {
    e.preventDefault();
    console.log("worked")
    try {
      const body = state;
      const response = await fetch("/events", {
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
                    Submit an Event
                </Typography>
            <Input placeholder="Name" name="name" value={state.name} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} />
            <Input placeholder="Description" name="description" value={state.description} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} />
            <Input placeholder="Time" name="time" value={state.time} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} />
            <Button color="primary" variant="contained" onClick={onSubmitForm} type="submit"> Submit Event </Button>        
        </form>
      
    </Fragment>
  );
};

export default InputEvent;
