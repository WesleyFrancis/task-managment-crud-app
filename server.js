const express = require("express");

const app = express();


app.get("/",(req,res)=>{
    res.send("home page")
});

app.get("/user/dashboard",(req,res)=>{
    res.send("user dashboar page")
});

app.get("/",(req,res)=>{
    res.send("home page")
});

app.get("/home",(req,res)=>{
    res.send("home page")
});

app.get("/home",(req,res)=>{
    res.send("home page")
});
const PORT = 3000;
app.listen(PORT,()=>{
    console.log("Web Server is up and running");
});