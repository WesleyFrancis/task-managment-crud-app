const express = require('express');
const router = express.Router();
router.get("/profile",(req,res)=>{
    let u = req.sessionID;//.destroy((error)=>{console.log(`${error}`)})
    res.render("user/userDashboard",{
        title:"UserDashboard",
        u
     } );
});

router.get("/upload",(req,res)=>{
    res.render("user/uploadPhotos");
});

router.post("/upload",(req,res)=>{

    
        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).send('No files were uploaded.');
        }
      
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.clientImageToUpload;
      
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(`/xampp/htdocs/school/task-management-crud-app/public/img/${req.files.clientImageToUpload.name}`,(err)=> {
            if(err)
            {
                return res.status(500).send(err);
            }
            res.redirect("/user/profile");
        });

        
});

router.get("/password",(req,res)=>{
    res.send("task edit form");
});

router.put("/password",(req,res)=>{
    res.send("task edit form");
});

module.exports = router;