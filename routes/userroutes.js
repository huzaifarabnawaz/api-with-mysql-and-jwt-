const express=require("express")
const router=express.Router()
const {signupvalidation}=require("../helpers/validation")
const usercontrols=require("../controllers/usercontroler")

router.post("/register",signupvalidation ,usercontrols.register)



module.exports=router
    