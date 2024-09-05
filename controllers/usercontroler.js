const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../dbconnection");

const randomstring = require('randomstring')
const send = require("../helpers/smtp")
const jwt = require('jsonwebtoken');
// const { errorMonitor } = require("nodemailer/lib/xoauth2");
const { jwt_secret } = process.env


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
                    console.log(JSON.stringify(err))

                    return res.status(500).send({ msg: "Database error." });


                }



                if (result.length) {
                    return res.status(409).send({ msg: "This user already exists" });
                }

                const hashedPassword = await bcrypt.hash(req.body.password, 10)




                db.query(
                    `INSERT INTO users (name, email, password,images) VALUES (${db.escape(req.body.name)}, ${db.escape(req.body.email)}, ${db.escape(hashedPassword)}, 'images/${req.file.filename}');`,
                    (error, result) => {
                        console.log(db.query)
                        if (error) {
                            console.log('Database insertion error')
                            console.log(error); 
                            return res.status(500).send({ msg: "Database insertion error." });
                        }

                        let mailsubject = "mail verification";
                        const randomtoken = randomstring.generate();
                        let content = '<p>hi' + req.body.name + '\
                        please <a href="http://localhost:5000/mail-verification?token='+randomtoken+'">verify</a> your mail'    ;
                        send(req.body.email,mailsubject,content)

                        db.query('UPDATE users SET token=?',[randomtoken,req.body.email],function(error,result,fields){

                            if(error){
                                return res.json(404).json({
                                    msg:"this is an error"
                                })
                            }

                        })

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


const mailverification = async (req, res) => {

    const token = req.query.token

    db.query(`SELECT * FROM users WHERE token=? LIMIT ,`, token, function (error, result, fields) {

        if (error) {
            console.log(error.message)
        }

        if (result.length > 0) {

            db.query(`UPDATE users SET token=null, verified=1, WHERE id= '${result[0].id}' `)

            return res.render("mailverification", { massage: 'mail verification is successfully' })
        }

        else {
            res.json('404')
        }


    })


}


const login = (req, res) => {

    if (!error.isEmpty()) {
        return res.status(404).json({ errors: errors.array() })
    }

    db.query(`select * from user where email=${db.escape(req.body.email)};`,
        (error, result) => {
            if (error) {
                return res.status(404).json({
                    msg: error
                })
            }

            if (!result.length) {
                res.send(401).res.json({ msg: "email and password is incorrect" })
            }

            bcrypt.compare(
                req.body.password,
                req[0]['password'],

                (berr, result) => {
                    if(berr){
                        return res.send(401).json({berr:msg})
                    }

                    if(result){
                        jwt.sign({id:result[0]['id'],},jwt_secret,{expiresIn:'1h'})

                        db.query(`update user set last_login=now() where id=${result[0]['id']}`)

                    }

                }

            )

        }

    )

}

module.exports = { register, mailverification, login }


