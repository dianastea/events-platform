import React, { Fragment, useEffect, useState } from "react";
import { Input, Button } from '@material-ui/core';
import { Typography } from "@material-ui/core";
import { createGroup } from "../services/UserService";
import useUserInfo from "../services/userInfo";

const form = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridGap: "10px",
  borderRadius: "5px",
  padding: "15px",
  margin: "20px 0 20px 0",
  boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
}



function InputGroup(props) {
  const [state, setState] = useState({
    name: "",
    description: "",
    groups: [],
    selected: 10
  });
  const user_id = useUserInfo().id 
  // useEffect(() => {
  //   console.log('user id', user_id)
  // }, [user_id])

  const onSubmitForm = async e => {
    e.preventDefault();
    
    createGroup({...state, user_id: user_id})
    window.location = "/"
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    console.log('state!!!', state)
  }


  return (
    <Fragment>
      <h2> {user_id} </h2> 
      <form noValidate autoComplete="off" style={form} onSubmit={onSubmitForm}>
        <Typography
          variant="h4">
          Create a Group
        </Typography>
        <Input placeholder="Name" name="name" value={state.name} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} />
        <Input placeholder="Description" name="description" value={state.description} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} />
        <Button color="primary" variant="contained" onClick={onSubmitForm} type="submit"> Create Group </Button>

      </form>


    </Fragment>
  );
};

export default InputGroup;
