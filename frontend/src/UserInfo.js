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
import { getUserInfo, getUserAdminGroups } from "./services/UserService"; // NEEDED? 
import AbortController from 'abort-controller'; 
import { Typography, Grid} from "@material-ui/core"; 


export default function UserInfo() {
    // user: provides name, email, google_id, profile pic of each user
    
    const [state, setState] = useState({user: {google_id: 0, id: 0}, adminGroups: []})
    // const [user, setUser] = useState({google_id: 0, id: 0, adminGroups: []}); 
    
    useEffect(() => {

        getUserInfo()
        .then(thisUser => {
            setState({...state, user: thisUser}); 
            // getUserAdminGroups(state.user.id)
            // .then(groups => {
            //     setState({...state, adminGroups: groups})
            // })

        })

    }, [])
    
    return (
        <div>
            {state.user.id}
            <div className="forms">
                {state.adminGroups.length > 0 ? <InputEvent user_id={state.user.id}/> : <div></div>}
                {state.adminGroups.length > 0 ? <InputTask user_id={state.user.id}/> : <div></div>}
                <InputGroup user_id={state.user.id} adminGroups={state.adminGroups}/> 
            </div>
            <TodoList user_id={state.user.id}/> 
            <div className="">
                <AllEvents id={state.user.id}/> 
                <AllGroups user_id={state.user.id}/> 
                <UserEvents id={state.user.id}/> 
            </div>
            
        </div>
    )
}