/*
import Tasks + MyEvents, passing through the user.google_id <-- NEEDED? 
*/
import React, {useState, Fragment, useEffect} from 'react'; 
import TodoList from "./components/TodoList"; 
import AllEvents from "./AllEvents"; 
import AllGroups from "./AllGroups"; 
import UserEvents from "./UserEvents"; 
import UserGroups from "./UserGroups"; 
import InputGroup from "./components/InputGroup"; 
import InputEvent from "./components/InputEvent"; 
import InputTask from "./components/InputTask"; 
import useUserInfo from './services/userInfo';
import useAdminGroups from './services/userAdminGroups';


export default function UserInfo() {
    // user: provides name, email, google_id, profile pic of each user
    const user = useUserInfo()
    const adminGroups = useAdminGroups(user.id) 

    return (
        <div>
            <div className="forms">
            {adminGroups.length > 0 ? <InputEvent user_id={user.id} adminGroups={adminGroups} /> : <div></div>}
            {adminGroups.length > 0 ? <InputTask user_id={user.id}/> : <div></div>}
            {user.id != 0 ? <InputGroup user_id={user.id} /> : <div></div> }
            </div>
            <TodoList user_id={user.id}/> 
            <div className="">
                <AllEvents id={user.id}/> 
                <AllGroups user_id={user.id}/> 
                <UserEvents id={user.id}/> 
                <UserGroups user_id={user.id} /> 
            </div>
            
        </div>
    )
}