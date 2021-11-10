const mongodb = require("../connection/mongo");
const { registerSchema, loginSchema } = require("../connection/schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hJgkkshk235#$";

const services = {
    async register(req, res) {
        try {
            //joi validation
            const { value, error } = await registerSchema.validate(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
            } else {
                //check user existance in db
                const data = await mongodb.users.findOne({ email: req.body.email });
                if (data) {
                    res.status(400).send("User already exists.Please login");
                } else {
                    //encrypting password
                    req.body.password = await bcrypt.hash(req.body.password, 10);
                    //inserting new user detail
                    const insertData = await mongodb.users.insertOne(req.body);
                    console.log(insertData);
                    res.status(201).send("User successfully registered");
                }
            }
        } catch (err) {
            res.send(err);
        }
    },
    async login(req, res) {
        try {
            //joi validation
            const { value, error } = await loginSchema.validate(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
            } else {
                //checking email existance
                const data = await mongodb.users.findOne({ email: req.body.email });
                if (!data) {
                    res.status(400).send("User doesn't exists Please Register");
                } else {
                    const valid = await bcrypt.compare(req.body.password, data.password);
                    if (!valid) {
                        res.status(400).send("Password is incorrect");
                    } else {
                        const payload = {
                            userId: data._id,
                        };
                        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
                        res.status(200).send({ email: data.email, token: token });
                    }
                }
            }
        } catch (err) {
            res.status(400).send(err);
        }
    }
}
module.exports = services;