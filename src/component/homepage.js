import React, { useEffect, useRef, useState } from 'react';
import './homepage.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import Timer from './timer';
function HomePage() {

const[user,setuser]=useState("")
const[task,settask]=useState([])
const[ft,setft]=useState(0)
const[only,setonly]=useState(0)





  let navigate = useNavigate()
  useEffect(() => {
    axios.post("https://timertodoback.onrender.com/blog/data", { token: window.localStorage.getItem("token") }).then(response => {
      console.log("bbbbbbbb")
     setuser(response.data.user)
      settask(response.data.dat)
      console.log(response.data)
    
   
    }).catch(error => { console.log(error, 11111111) })
  }, [ft])


   let logoutHandler = () =>{
      console.log(1)
              window.localStorage.removeItem('token')

              navigate("/")
           }
  return (
    <div className='homepage'>
    <div className='user'>{user}</div>
     <div className='cont'>
      <div className='todo'>
        <h1 className='k'>Todo list</h1>
        <h1 className='k'>History</h1>
        {task&&task.map((el)=>{
          return <div>{el.time?<div>{el.activity}  : {el.time}</div>:""}</div>
        })}
      </div>
      <div className='acti'>
       <Link to="/create" state={{ name: user }}><span className='spa'>ADD ACTIVITY</span></Link> 
        <span className='log' onClick={logoutHandler}>Logout</span>
        <div className='table'>
          <div className='table'>
            <div className='tr'>
              <div className='th'>Activity</div>
              <div className='th'>Status</div>
              <div className='th'>Time taken(Hr min sec)</div>
              <div className='th'> Action</div>
            </div>
           {task&&task.map((ele,i)=>{
            return<div className='list' key={i}>
              <div className='p'>{ele.activity}</div>
             
            <div id='nm'> <Timer idl={ele._id} time={ele.time} setonly={setonly} only={only} setft={setft}></Timer></div>
            </div>
            
          
           })}
          </div>
        </div>
      </div>
     </div>
    </div>
  )
}


export default HomePage;
