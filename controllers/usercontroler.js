const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../dbconnection");

const randomstring = require('randomstring')
const send = require("../helpers/smtp")

const register = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const email = db.escape(req.body.email)


        db.query(

            `SELECT * FROM users WHERE lower(email) = lower(${email})`,
            async (err, result) => {

                if (err) {

                    return res.status(500).send({ msg: "Database error." });
        

                }



                if (result.length) {
                    return res.status(409).send({ msg: "This user already exists" });
                }

                const hashedPassword = await bcrypt.hash(req.body.password, 10)



                db.query(
                    `INSERT INTO users (name, email, password,image) VALUES (${db.escape(req.body.name)}, ${db.escape(req.body.email)}, ${db.escape(hashedPassword)}, 'images/${req.file.filename}');`,
                    (error, result) => {
                        if (error) {
                            console.log('Database insertion error')
                            console.log(error);
                            return res.status(500).send({ msg: "Database insertion error." });
                        }

                        // let mailsubject = "mail verification";
                        // const randomtoken = randomstring.generate();
                        // let content = '<p>hi' + req.body.name + '\
                        // please <a href="http://localhost:5000/mail-verification?token='+randomtoken+'">verify</a> your mail'    ;
                        // send(req.body.email,mailsubject,content)
                            
                        // db.query('UPDATE users SET token=?',[randomtoken,req.body.email],function(error,result,fields){

                        //     if(error){
                        //         return res.json(404).json({
                        //             msg:"this is an error"
                        //         })
                        //     }

                        // })

                        return res.status(500).send({ msg: "The user has been registered." });
                    }
                );
            });
    }
    catch (error) {
        console.log(error)
    }

    console.log(req.body)

}



module.exports = { register };



