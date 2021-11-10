const { MongoClient } = require("mongodb");
//const URL = process.env.URL;
const URL = "mongodb+srv://joyce:admin%40123@cluster0.fqwyn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
console.log(URL);
// const DB_NAME = "password_reset";
const DB_NAME = process.env.DB_NAME;
const client = new MongoClient(URL);

const mongodb = {
    db:null,
    users:null,

    async connect(){
        await client.connect();
        this.db = client.db(DB_NAME);
        this.users = this.db.collection("users");
    }
};

module.exports = mongodb;
