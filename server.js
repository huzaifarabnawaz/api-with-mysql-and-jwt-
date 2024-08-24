require("dotenv").config();

const express=require("express")

const app=express()
require("./dbconnection")















app.listen(7000,()=>{
    console.log("port 7000 hase been sucessfully runin ")
})