const {DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME}=process.env

const mysql=require("mysql")

const con = mysql.createConnection({
    host:DB_HOST,
    user:DB_USERNAME,
    password:DB_PASSWORD,
    databasename:DB_NAME,
})

con.connect(function(error){
    if(error) throw error;
    console.log("connection hase been success full ")
})