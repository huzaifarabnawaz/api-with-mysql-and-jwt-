const expres=require("express")

const webroutes=expres()

webroutes.set("view engine","ejs")
webroutes.set("views",'./views')
webroutes.use(expres.static('public'))

const usercontrol=require("../controllers/usercontroler")

webroutes.get('/mailverification',usercontrol.mailverification)


module.exports=webroutes