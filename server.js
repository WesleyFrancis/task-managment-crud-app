const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mySql = require("./config/mysqlDAO.js");
const session = require('express-session');
const httpProcessing = require("./middleware/HttpProcessing.js");
const fileUpload = require('express-fileupload');

const app = express();
const helper = exphbs.create({
    helpers:{
        ifEq(a,b,options)
        {
            if(a==b)
            {
                return options.fn(this)
            }
            else{
                return options.inverse(this)
            }
        }
    }
})
// console.log(`This is the current directory : ${__dirname}`);

//middleware
app.engine('handlebars', helper.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
require('dotenv').config({path:"config/keys.env"});
app.use(httpProcessing);
//body-parser
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    //cookie:{secure:false}
}))


//import controls
const adminController = require("./controllers/admin");
const generalController = require("./controllers/general");
const taskController = require("./controllers/tasks");
const userController = require("./controllers/user");
const authController = require("./controllers/auth.js");

app.use((req,res,next)=>{
    res.locals.localUserInfo = req.session.userInfo;
    next();
})

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//map controlers
app.use("/",generalController);
app.use("/admin",adminController);
app.use("/user", userController);
app.use("/task", taskController);
app.use("/auth", authController);



app.listen(process.env.PORT,()=>{
    console.log("Web Server is up and running");
});