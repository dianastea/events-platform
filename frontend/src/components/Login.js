import React, { Fragment, useState } from "react";
import { Input, Button } from '@material-ui/core';
import { Grid, Paper, Typography } from "@material-ui/core";
import { Redirect } from 'react-router-dom';



export default function Login() {
    
    return (
        <div>
            <Button color="primary" variant="contained" type="submit"> 
                <a href="http://localhost:8080/auth/google" style={{textDecoration: "none", color: "inherit"}}> LOGIN </a> 
            </Button>

            <Button color="primary" variant="contained" type="submit" style={{marginLeft: '10px'}}> 
                <a href="http://localhost:8080/logout" style={{textDecoration: "none", color: "inherit"}}> LOGOUT </a> 
            </Button>
        </div>
    )
}