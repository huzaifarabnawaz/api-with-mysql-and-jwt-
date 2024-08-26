const express=require("express")
const router=express.Router()
const {signupvalidation}=require("../helpers/validation")
const usercontrols=require("../controllers/usercontroler")

const path=require("path")
const multer=require("multer")

const storage=multer.diskStorage({
    destination:function(req,res,calbackfn){

    },
    filename:function(req,res,calbackfn){

    }
})

const update=multer({storage:storage})


router.post("/register",signupvalidation ,usercontrols.register)




module.exports=router
    