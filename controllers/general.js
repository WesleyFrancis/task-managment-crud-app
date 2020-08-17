const express = require('express');
const router = express.Router();

router.get("/",(req,res)=>{
    res.render("general/home",{
        title:"Home page"
    });

    console.log(req)
});

router.post("/",(req,res)=>{
    res.send("task form");
});

router.get("/contact-us",(req,res)=>{
    res.render("general/contactUs",{
        title:"contact us"
    });
});

router.get("/register",(req,res)=>{
    res.render("general/register",{
        title:"Register"
    });
});


module.exports = router;