/*
import Tasks + MyEvents, passing through the user.google_id <-- NEEDED? 
*/
import React, {useState, useEffect} from 'react'; 
import TodoList from "./components/TodoList"; 
import AllEvents from "./AllEvents"; 
import AllGroups from "./AllGroups"; 
import UserEvents from "./UserEvents"; 
import InputGroup from "./components/InputGroup"; 
import InputEvent from "./components/InputEvent"; 
import InputTask from "./components/InputTask"; 
import { getUserInfo } from "./services/UserService"; // NEEDED? 
import AbortController from 'abort-controller'; 
import { Typography, Grid} from "@material-ui/core"; 


export default function UserInfo() {
    // user: provides name, email, google_id, profile pic of each user
    const [user, setUser] = useState({google_id: 0, id: 0}); 
    
    useEffect(() => {

        getUserInfo()
        .then(user => {
            console.log("USER INFO*****", user)
            setUser(user); 
        })

    }, [])
    
    return (
        <div>
            <div className="forms">
                <InputGroup user_id={user.id}/> 
                <InputEvent /> 
                <InputTask user_id={user.id}/> 
            </div>
            <TodoList user_id={user.id}/> 
            <div className="">
                <AllEvents id={user.id}/> 
                <AllGroups user_id={user.id}/> 
                <UserEvents id={user.id}/> 
            </div>
        </div>
    )
}