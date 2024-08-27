const {DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME}=process.env

const mysql=require("mysql")

console.log(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME)

const poolConfig = {
    host:DB_HOST,
    user:DB_USERNAME,
    password:DB_PASSWORD,
    databasename:DB_NAME,
    database: DB_NAME
}

const con = mysql.createPool(poolConfig)

con.getConnection(function(error){
    if(error) throw error;
    console.log("connection hase been success full ")
})


module.exports=con