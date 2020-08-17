const express = require('express');
const session = require('express-session');
const router = express.Router();

const {loginFormValidation} = require("../middleware/validation.js");

router.post('/login',loginFormValidation,(req,res)=>{

    //validate userr login
    req.session.userInfo = req.user;

    if(req.session.userInfo.role == "admin")
    {
        res.redirect("/admin/dashboard");
    }
    else
    {
        res.redirect("/user/profile");
    }
})

router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{console.log(`error deleting session:${err}`)});
    res.redirect("/");
})
module.exports = router;


/*
ProjectDir 
    /config         //@ folder that container all the configuration files
	----Keys.env    //@ static key value pairs that are accessed by process.env.property
    ----mysqlDOA.js //@sql connection file that must be imported into all models.
	/Controllers    //? folder contains major actors in the project as files that handle routes
    /models         //? folder contains files for the use of deleting, fetching and updating the database.
	/middleware     //? contains functions in the form of middleware that adds functionality between req and res
	/Node_modules   //! Containes all the libraries that are needed by node. Must be ignored in .gitignore
	/public         //+ Contains all the static files required by the site.  
		/css    	//* self Explanatory
		/js			//* self Explanatory
		/img		//* self Explanatory
		/audio		//* self Explanatory
		/fonts		//* self Explanatory
	/views			//+ contains all the views that would be rendered by express
		/Layouts
            main.handlebars //+ master boiler plate for express
    .gitignore
    package.json 	//+ application meta data, information about the current project
	package-lock.json//+ contains infomation related to the dependancies of the imported libraries
	server.js		//? Entry point File.


	"dependencies":  {
    "bcryptjs": "^2.4.3", 	//+ Encryption library 
    "dotenv": "^8.2.0", 	//+ helps with enviroment variables
    "express": "^4.17.1",	//+ NodeJs FrameWork
    "express-handlebars": "^5.1.0", //+ Express framework for dynamic HTML
    "express-session": "^1.17.1",	//+ Helps with session/ Secureity. Stores user information on the server side
    "mysql2": "^2.1.0"				//+ database management system
}
*/