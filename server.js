require("dotenv").config();

const express=require("express")
const bodyParser = require("body-parser");
require("./dbconnection")
const userroutes=require("./routes/userroutes")
const webroutes=require("./routes/webroutes")

const app=express()
// app.use(express.json())
// app.use(bodyParser.urlencoded({extended:true}))

app.use("/api",userroutes)
app.use("/",webroutes)



app.listen(5000,()=>{
    console.log("port 5000 hase been sucessfully runin ")
})      