const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../dbconnection");

const register = async (req, res) => {
try{

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
                return res.status(409).send({ msg: "This user already exists." });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 1)



                db.query(
                    `INSERT INTO users (name, email, password) VALUES (${db.escape(req.body.name)}, ${db.escape(req.body.email)}, ${db.escape(hashedPassword)})`,
                    (error, result) => {
                        if (error) {
                            console.log('Database insertion error')
                            console.log(error);
                            return res.status(500).send({ msg: "Database insertion error." });
                        }

                        return res.status(201).send({ msg: "The user has been registered." });
                    }
                );
            });
        }
catch(error){
    console.log(error)
}

console.log(req.body)

}



module.exports = { register };



