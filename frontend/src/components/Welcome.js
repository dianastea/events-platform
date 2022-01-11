import React, { useEffect, useState } from "react"; 
import { getUserEvents, getUserInfo } from "../services/UserService";
import {  Typography } from "@material-ui/core";
import useUserInfo from '../services/userInfo'

export default function Welcome() {

    const user = useUserInfo() 
    
    return (
        <div style={{marginBottom: "10px"}}>
            <Typography variant="h1">Welcome {user.name}</Typography>
            <Typography>Email: {user.email}</Typography>
        </div>
        
    )
}