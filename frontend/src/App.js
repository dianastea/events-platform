import React from 'react'; 
import InputEvent from "./components/InputEvent"; 
import InputTask from "./components/InputTask"; 
import Login from "./components/Login"; 
import Welcome from "./components/Welcome"; 
import UserInfo from "./UserInfo"; 

export default function App() {

  
  return (
    <div className="wrapper"> 
      <Welcome/> 
      <Login/>
      <div className="forms">
        <InputEvent/> 
        <InputTask /> 
      </div>
      <UserInfo/> 
    </div> 
  )
}