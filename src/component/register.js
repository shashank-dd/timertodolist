import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './register.css';

const Register = () => {
  const navigate=useNavigate()
   const [form,setform]=useState({ email:"",password:"",confirmpassword:""})
   function submithandler() {
    console.log("1")
   
    console.log(form)
    if( validate(form)){
        axios.post("https://timertodoback.onrender.com/register/register", form).then(response => {
            console.log(response.data.status)
            if (response.data.status === "ok") {
                alert("registered succesfully")
                navigate("/")
                // window.location.href="/"
            }
        }).catch(error => { if(error.response.data.message==="User already exists with the given email"){
            alert("User already exists with the given email")
        } })
    }
   
}
let validate = (values) => {
    if (!values.email) {
        alert('email is required')
        return 0
    }else if (!values.password) {
        alert('password is required')
        return 0
    } else if (values.password.length < 4) {
        alert("Password must be more than 4 characters");
        return 0
    } else if (values.password.length > 10) {
        alert("Password cannot exceed more than 10 characters");
        return 0
    }
    if (!values.confirmpassword) {
        alert('confirmpassword is required')
        return 0
    }
    else if (values.password !== values.confirmpassword) {
        alert('password are not matching')
        return 0
    }
    return 1
}
  return (
    <div id="container-login">
      <div className="login">
        <div className="lo"> <h2 id="loginh1">Register</h2></div>
        <div className="lo">Email</div>
        <div className="lo"> <input type="email" onChange={(e)=>{ setform({...form,email:e.target.value}) }} ></input></div>
        <div className="lo">password</div>
        <div className="lo"> <input type="password" onChange={(e)=>{ setform({...form,password:e.target.value}) }}></input></div>
        <div className="lo"> confirm password</div>
        <div className="lo"> <input type="password" onChange={(e)=>{ setform({...form,confirmpassword:e.target.value}) }}></input></div>
        <div > <button className="lob" onClick={submithandler}>Singup</button></div>

        <div id="lk">already had  a account<Link to="/"> <span>login</span></Link></div>

      </div>
    </div>
  )
}


export default Register;