const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const userModel = require("../models/models/user.js");
const User = require("../models/POJO/user.js");
const {userAddFormValidation} = require("../middleware/validation.js");
const auth = require("../middleware/auth.js");


router.get("/dashboard",auth,(req,res)=>{
    userModel.getAllUsers()
    .then((userData)=>{
        res.render("admin/adminDashboard",{
            title:"Admin Dashboard",
            userData
        })
    })
    .catch(err=>console.log(`error did not get all users: ${err}`))

    
});

router.get("/adduser",(req,res)=>{
    res.render("admin/adduser",{
        title:"Admin Dashboard"
    })
});

router.post("/adduser",userAddFormValidation,(req,res)=>{

    bcrypt.genSalt(10)
    .then((salt)=>bcrypt.hash(req.user.password,salt))
    .then((excryptedPassword)=>{

        req.user.password = excryptedPassword;

        userModel.createUsers(req.user)
        .then(()=>{
            res.redirect("/admin/dashboard");
        })
        .catch((err)=>console.log(err))

    })
    .catch(err=>console.log(`error`))

   
  
});


router.delete("/delete/:idd",(req,res)=>{
    userModel.deleteUser(req.params.idd)
    .then(()=>{
        res.redirect("/admin/dashboard")
    })
    .catch(err=>console.log(`Delete user : ${err}`))

})

module.exports = router;