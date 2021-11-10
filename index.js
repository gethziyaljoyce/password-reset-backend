const express = require("express");
const mongodb = require("./connection/mongo");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
require("dotenv").config();

const port = process.env.PORT || 5000;
// const port = 5000;

(async () => {
    try {
        //connect to database
        await mongodb.connect();


        app.use(cors());

        //to convert req body into json 
        app.use(express.json());

        //route for user
        app.use("/users", userRoutes);

        //server start
        app.listen(port, () => {
            console.log("server started at", port)
        });
    } catch (err) {
        console.log(err);
    }
})();
