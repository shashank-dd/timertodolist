import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css';


const Login = () => {
    const navigate=useNavigate()
const[loginf,setloginf]=useState({ email:"",password:""})
    function submitHandler (){
        console.log(loginf)
      axios.post("https://timertodoback.onrender.com/login/login",loginf).then(response =>{
        
        console.log(response.data.status)

        
        if(response.data.Status === "ok"){
            alert('login successfull')
            window.localStorage.setItem("token",response.data.token)
            navigate("/homepage")
        
          }
    }).catch(error =>{alert("password and email are not matching")})
   }

    return (
        <div id="container-login">
            <div className="login">
               <div className="lo"> <h2 id="loginh1">Login</h2></div>
                 <div className="lo">Email</div>
                <div className="lo"> <input type="email" onChange={(e)=>{ setloginf({...loginf,email:e.target.value}) }}></input></div> 
                 <div className="lo">password</div>
                 <div className="lo"> <input type="password" onChange={(e)=>{ setloginf({...loginf,password:e.target.value}) }}></input></div> 
                 <div > <button className="lob" onClick={submitHandler}>Login</button></div>
                 <div id="lk">need a acount<Link to="/register"> <span>singup</span></Link></div>
                
            </div>
        </div>

    )
}


export default Login;