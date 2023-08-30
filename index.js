const express = require("express");
const {connectToMongoDB} = require('./connection');
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const staticRoute =  require("./routes/staticRouter");
const path = require('path');
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>{
    console.log("db connected successfully");
}).catch((error)=>{
    console.log(error);
})

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());



// app.get("/test", async (req,res)=>{
//     const allUrls = await URL.find({});
//     return  res.render("home",{
//         urls:allUrls,
//     });
// } );

app.use("/url",urlRoute);
app.use("/",staticRoute);


app.listen(PORT, ()=>console.log(`Server is running on Port: ${PORT}`));