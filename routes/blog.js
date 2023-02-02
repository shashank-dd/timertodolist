const express=require("express")
const route=express.Router();
const cors = require("cors");
var jwt = require('jsonwebtoken');
route.use(cors({
    origin: "*",
}))
const data=require("../models/data.js")
route.use(express.json())
const cloudinary=require("cloudinary").v2
const  fileupload= require("express-fileupload")
const bodyParser = require("body-parser");
route.use(bodyParser.urlencoded())
route.use(bodyParser.json())
route.use(fileupload({
    useTempFiles:true,
    limits:{fileSize :50*2024*1024}
}))

route.post("/post",async(req,res)=>{
    try {
console.log(req.body)
        console.log("rout comming")
     
        const dat=await data.create({
            name:req.body.name,
            activity:req.body.activity,
            time:req.body.time
        
          }) 
        res.json({
            ok:"ok",
            data:dat

        })
    } catch (e) {
        res.json({
            err:e.message
        })
    }
   
})
route.put("/put",async(req,res)=>{
    try {
console.log(req.body)
        console.log("rout comming")
     
        const dat=await data.update({_id:req.body.g},{$set:{time:req.body.second}}) 
        res.json({
            ok:"okh",
           dat:dat

        })
    } catch (e) {
        res.json({
            err:e.message
        })
    }
   
})
route.post("/data",(req,res)=>{
    try {
        console.log("coming  to data")
console.log(req.body.token)

if(req.body.token){
    // verify a token symmetric
    console.log(8)
    jwt.verify(req.body.token,process.env.SECRET, async function(err, decoded) {
        if(err) {
            return res.status(403).json({
                status: "failed",
                message: "Not a valid token"
            })
        }
        console.log(8)
        console.log(decoded.data,decoded,1 )
        console.log(0)
   const     nam =  decoded.data.split("@")[0];
   console.log(nam)
        const dat=await data.find({
            name : nam,
           
          }) 
          console.log("data",dat)
          
        res.json({
            ok:"data",  
           dat:dat,
            user:nam  ,
            userid:  decoded.data           
            

        })
    
    });
}else {
    return res.status(401).json({
        status: "Failed",
        message: "Toeken is missing"
    })
}
    } catch (e) {
        res.json({
            err:e.message
        })
    }
   
})










 module.exports= route;