const {chek, check}= require("express-validator")


const signupvalidation =[
    check("name","name is required").not().isEmpty(),
    check("email","email is requires").isEmail().normalizeEmail({gmail_remove_dots:true}),
    check("password","password is requer").isLength({main:6}),
    check('images').custom((value,{req})=>{

        if(req.file.mimetype =='image/jpeg' || 'image/png'){
            return true
        }
        else{
            return false
        }

    }).withMessage("please upload an image type jpeg and png")
]


const loginvalidation =[ 
    check("email","email is requires").isEmail().normalizeEmail({gmail_remove_dots:true}),
    check("password","password is requer").isLength({main:6}),

]







module.exports={signupvalidation,loginvalidation}