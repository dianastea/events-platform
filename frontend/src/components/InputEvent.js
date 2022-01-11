import React, { Fragment, useEffect, useState } from "react";
import { Input, Button } from '@material-ui/core';
import { Grid, Paper, Typography } from "@material-ui/core";
import { createEvent } from "../services/UserService";
import useAdminGroups from "../services/userAdminGroups";
import useUserInfo from "../services/userInfo";
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


const InputEvent = (props) => {
  const [state, setState] = useState({
    name: "",
    description: "",
    time: "",
    group_name: props.adminGroups[0].group_name
  });

  const onSubmitForm = async e => {
    e.preventDefault();
    createEvent(state)
    // resets state? 
    window.location = "/"

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  return (
    <div>
      <Fragment>
      
        <form noValidate autoComplete="off" style={form} onSubmit={onSubmitForm}>
          <Typography
            variant="h4">
            Submit an Event
          </Typography>
          <Input placeholder="Name" name="name" value={state.name} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} />
          <Input placeholder="Description" name="description" value={state.description} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} />
          <Input placeholder="Time" name="time" value={state.time} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} />
          <InputLabel id="demo-simple-select-label">Choose Group</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="group_name"
            value={state.group_name}
            label="Age"
            onChange={handleChange}
          >
            {props.adminGroups.map((group, index) => (
                        <MenuItem value={group.group_name} key={index}> {group.group_name} </MenuItem> 
            ))}
          </Select>
          <Button color="primary" variant="contained" onClick={onSubmitForm} type="submit"> Submit Event </Button>
        </form>

      </Fragment>


    </div>

  );
};

export default InputEvent;
