const express=require("express")
const router=express.Router()
const {signupvalidation}=require("../helpers/validation")
const usercontrols=require("../controllers/usercontroler")

const path=require("path")
const multer=require("multer")

const storage= multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null,path.join(__dirname,'../public/images'))
    },
    filename:function(req,res, cb){
        const name=Date.now()+'-'+file.originalname;
        cb(null.name)
    }
})
    
const filefilter=(req,file,res)=>{
    console.log(file)
        (file.mimitype=='image/jpg' || file.mimitype=='image/png')?
        cb(null,true):cb(null,false)
    }

    const upload=({
        storage:storage,
        filefilter:filefilter
    })



router.post("/register", upload("images"), signupvalidation ,usercontrols.register)

module.exports=router
