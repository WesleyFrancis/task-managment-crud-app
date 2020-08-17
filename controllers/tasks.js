const express = require('express');
const router = express.Router();

router.get("/add",(req,res)=>{

    res.render("task/taskAddForm",{
        title:"Add task"
    })
});

router.post("/add",(req,res)=>{

    res.render("task/taskAddForm",{
        title:"Add task"
    })
});

router.get("/dashboard",(req,res)=>{
    res.render("task/taskDashboard",{
        title:"Task Dashboard"
    });
});

router.get("/edit",(req,res)=>{
    res.render("task/taskEditForm",{
        title:"Edit Task"
    });
});

router.put("/edit",(req,res)=>{
    res.send("task edit form");
});

router.put("/delete",(req,res)=>{
    res.send("task edit form");
});

router.post("/add",(req,res)=>{
    res.send("task form");
});

module.exports = router;