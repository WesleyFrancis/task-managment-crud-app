const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

//middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

//body-parser
app.use(bodyParser.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("general/home",{
        title:'HomePage'
    })
});

app.post("/userDashboard",(req,res)=>{
    res.send(`${req.body.username} , ${req.body.password}`);
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