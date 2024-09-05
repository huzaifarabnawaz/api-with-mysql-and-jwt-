const mysql=require("mysql")
const {DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME,JWT_SECRET}=process.env


console.log(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME)

const poolConfig = {
    host:DB_HOST,
    user:DB_USERNAME,
    password:DB_PASSWORD,
    database:DB_NAME,
    JWT:JWT_SECRET

}

const con = mysql.createPool(poolConfig)

con.getConnection(function(error){
    if(error) throw error;
    console.log("connection hase been success full ")
})


module.exports=con