/*
import Tasks + MyEvents, passing through the user.google_id <-- NEEDED? 
*/
import React, {useState, useEffect} from 'react'; 
import TodoList from "./components/TodoList"; 
import AllEvents from "./AllEvents"; 
import UserEvents from "./UserEvents"; 
import { getUserInfo } from "./services/UserService"; // NEEDED? 
import AbortController from 'abort-controller'; 
import { Typography, Grid} from "@material-ui/core"; 


export default function UserInfo() {
    // user: provides name, email, google_id, profile pic of each user
    const [user, setUser] = useState({google_id: 0, id: 0}); 
    
    useEffect(() => {
        /* NEEDED? - AbortController */
        // const abortController = new AbortController(); 
        // const signal = abortController.signal; 

        // fetch('/userInfo', {signal : signal})
        // .then(user => user.json())
        // .then(user => {
        //     setUser(user); 
        // })

        getUserInfo()
        .then(user => {
            console.log("USER INFO*****", user)
            setUser(user); 
        })

        // return function cleanup() {
        //     abortController.abort(); 
        // }
    }, [])
    
    return (
        <div>
            <TodoList user_id={user.id}/> 
            <div className="">
                {/* All Events */}
                <AllEvents id={user.id}/> 
                {/* User Events */}
                <UserEvents id={user.id}/> 
            </div>
        </div>
    )
}