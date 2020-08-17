
const User = require("../models/POJO/user.js");
const userModel = require("../models/models/user.js");
const bcrypt = require("bcryptjs");

exports.userAddFormValidation =(req,res,next)=>{
    const user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;
    user.gender = req.body.gender;

    req.user = user;
let isErr = false;
const errors = {
    firstname:null,
    lastName:null,
    email:null,
    gender:null,
    username:null,
    password:null,
    cPassword:null,

}
    if(user.firstName =="")
    {
        isErr = true;
        errors.firstname = "you must enter a First Name";
    }
    if(user.lastName =="")
    {
        isErr = true;
        errors.lastName = "you must enter a Last Name";
    }
    if(user.gender == null)
    {
        isErr = true;
        errors.gender = "you must enter a gender";
    }
    if(user.email =="")
    {
        isErr = true;
        errors.email = "you must enter an email";
    }
    if(user.username =="")
    {
        isErr = true;
        errors.username = "you must enter a username";
    }
    if(user.password =="")
    {
        isErr = true;
        errors.password = "you must enter a Password";
    }
    if(req.body.cpassword=="")
    {
        isErr = true;
        errors.cPassword = "you must enter a Password";
    }

    if(isErr)
    {
        res.render("admin/adduser",{
            title:"Add User",
            errors,
            user
        })
    }
    else
    {
      next();
    }
};

exports.loginFormValidation = (req,res,next)=>{
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;

    req.user = user;//@create a temp request object and assign a value to it so it can be access on another page

    let isErr = false;
    const errors = {

        email:null,
        password:null,
    }


    if(user.email =="")
    {
        isErr = true;
        errors.email = "you must enter an email";
    }

    if(user.password =="")
    {
        isErr = true;
        errors.password = "you must enter a Password";
    }

    //if there is no error.
    if(!isErr)
    {
       //1 check to see if the entered email exists in db
       //if t does return all that user info from the database.
       //compare the password.

      userModel.getUserByEmail(user.email)
      .then((userD)=>{
        //if this user has a value that is not null then it means that the email exists
        if(userD)
        {
            //check to see if the pasword is correct.
            bcrypt.compare(req.body.password,userD.password)
            .then((val=>{
                if(val)
                {
                    req.user = userD; //create object to allow next middle ware to access properties
                    next();
                }
                else
                {
                    errors.password = "Sorry you enterd an incorrect email / password";
                    
                    res.render("general/home",{
                        title:"Add User",
                        errors
                    })
                }
            }))
            .catch(err=>console.log(`Error :Comparing password to hash: ${err}`))
        }
        else //the email dosent exist
        {
            errors.password = "Sorry you enterd an incorrect email / password";
            res.render("general/home",{
                title:"Add User",
                errors
            })
        }

      })
      .catch(err=>console.log(`Error :failure to get user by email: ${err}`))

    }
    else// these errors is if they did not enter a password or eamail
    {
        errors.password = "you must enter a Password";
        res.render("general/home",{
            title:"Add User",
            errors
        })
    }
};

exports.taskAddFormValidation = (req,res,next)=>{

};

exports.uploadFormValidation  = (req,res,next)=>{

};