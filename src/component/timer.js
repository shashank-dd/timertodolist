import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
const Timer = ({ idl, time, setft,setonly, only }) => {
    const [second, setsecond] = useState(0)
    const [min, setmin] = useState(0)
    const [hour, sethour] = useState(0)
    const [flag, setflag] = useState(false)
    const [bigflag, setbigflag] = useState(true)
    const [d, setd] = useState("pending")

    useEffect(() => {

        return () => clearInterval(id.current)
    }, [])

    let id = useRef()
    function gop() {
        id.current = setInterval(() => {
            setsecond((p) => p + 1)
            if(second==60){
                setmin((p)=>p+1)
            }
            if(min==60){
                sethour((p)=>p+1)
            }
        }, 1000)
    }
    async function timing(g) {
        console.log(g, second)
        let pil = {
            g, second
        }
        const data = await axios.put("https://timertodoback.onrender.com/blog/put", pil)
        console.log(data, data.data)
    }
    return (
        <div className="pu">
            <div className="pm">{d}</div>
           {time?`${time}`: <div>


            <div className='left'>{time}{hour ? hour : ""}{min ? min : ""}{second ? second : ""}</div>
            {bigflag ? <div className='right'>{!flag ? <button onClick={() => {
                console.log(only,"ooooooop")
                  if(only==0){
                    gop()
                    setd("ongoing")
                    setflag(true)
                    setonly(9)
                  }else{
                    alert("finishing the ongoing task first or pause the ongoing task")
                  }
              
              
            }}>start</button> : ""}
                {flag ? <button onClick={() => {
                    clearInterval(id.current)

                    setd("completed")
                    setbigflag(false)
                    timing(idl)
                    setonly(0)
                    setTimeout(() => {
                        setft((p) => p + 1)
                    }, 2000);

                }
                }>end</button> : ""}
                {flag ? <button onClick={() => clearInterval(id.current)}>pause</button> : ""}
            </div> : ""}
            </div>}
          
        </div>

    )
}


export default Timer;