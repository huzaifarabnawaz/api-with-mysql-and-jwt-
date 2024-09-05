const nodemailer=require('nodemailer')
const dotenv = require('dotenv')
 dotenv.config()

const {SMTP_MAIL,SMTP_PASSWORD}=process.env


const sendmail=async(email,mailsubject,content)=>{

    try{

        console.log('moew',SMTP_MAIL, SMTP_PASSWORD)
     const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user: SMTP_MAIL,
                pass: SMTP_PASSWORD,
            },
            logger: true, // Enable logging
            debug: true,  // Include SMTP traffic in logs
        
        })

        const mailoption={
            from:SMTP_MAIL,
            to:email,
            subject:mailsubject,
            html:content
        }

        transporter.sendMail(mailoption,function(error,info){

            if(error){
                console.log(error)
            } 
            else{
                console.log("mail send suceess fully".info.response)
            }


        })


    }
    catch(error){
        console.log(error)
    }


}



module.exports=sendmail