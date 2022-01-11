import React, { useEffect, useState } from "react"; 
import { getUserEvents, getUserInfo } from "../services/UserService";
import {  Typography } from "@material-ui/core";


export default function Welcome() {

    const [info, setInfo] = useState({})

    useEffect(() => {
        getUserInfo()
        .then(info => {
            setInfo(info); 
            getUserEvents(info.id)
        })
    })
    return (
        <div style={{marginBottom: "10px"}}>
            <Typography variant="h1">Welcome {info.name}</Typography>
            <Typography>Email: {info.email}</Typography>
        </div>
        
    )
}