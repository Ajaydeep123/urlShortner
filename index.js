const express = require("express");
const {connectToMongoDB} = require('./connection');
const urlRoute = require("./routes/url");
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>{
    console.log("db connected successfully");
}).catch((error)=>{
    console.log(error);
})
app.use(express.json());
app.use("/url",urlRoute);
app.listen(PORT, ()=>console.log(`Server is running on Port: ${PORT}`));