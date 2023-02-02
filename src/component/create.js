import React, {  useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './create.css';

const Create = () => {
    let navigate = useNavigate()
const [post,setpost]=useState({name:"" ,activity:"",time:0})
const location =useLocation();
useEffect(()=>{
    console.log(777)
    console.log(location.state.name,location)
 setpost({
  ...post,
    name:location.state.name,
   
 })
},[])

async function hh() {


    const data = await axios.post("https://timertodoback.onrender.com/blog/post", post)
    console.log(data,data.data.ok)
    console.log("hh")
    if (data.data.ok === "ok") {
      console.log(1)
        navigate("/homepage")
    
    }
    console.log(2)
}

  return (
    <div>
      <div id='nav'>
     
        
       <Link to="/homepage"><span id='home'>home</span></Link> 
       
       
        <div className="ba">
      <div>
        <label>Activity</label>
        <input type="text" onChange={(e)=>{ setpost({...post,activity:e.target.value}) }}></input></div>
   
    
      <div><button onClick={hh}>add</button></div>
     
      
    </div>

      </div>
    </div>
    
  )
}


export default Create;