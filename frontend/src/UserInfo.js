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
import useUserInfo from './services/userInfo';
import useAdminGroups from './services/userAdminGroups';


export default function UserInfo() {
    // user: provides name, email, google_id, profile pic of each user
    
    const user = useUserInfo()
    const adminGroups = useAdminGroups(user.id)
    console.log('ADMIN GROUPS', adminGroups)
    // useEffect(() => {
    //     let isSubscribed = true 

    //     const updateUser = async () => {
    //         const thisUser = await getUserInfo()
    //         if (isSubscribed) {
    //             setState({...state, user: thisUser})
    //             console.log('IN UPDATEUSER 1', state)
    //             const adminGroups = await getUserAdminGroups(state.user.id)
    //             setState({...state, adminGroups: adminGroups})
    //             console.log('IN UPDATEUSER 2', state)
    //         }
            
    //     }

    //     updateUser().catch(console.error)

    //     return () => isSubscribed = false 

    // })
    
    return (
        <div>
            <div className="forms">
            {adminGroups.length > 0 ? <InputEvent user_id={user.id}/> : <div></div>}
            {adminGroups.length > 0 ? <InputTask user_id={user.id}/> : <div></div>}
            {adminGroups.length > 0 ? <InputGroup user_id={user.id} admingroups={adminGroups} /> : <div></div>}
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