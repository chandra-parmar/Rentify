const express= require('express')
const router= express.Router()
const User = require('../models/user')
const wrapAsync= require('../utils/wrapAsync')
const passport= require('passport')
const { saveRedirectUrl } = require('../middleware')

const userController = require('../controllers/users')


//signup form 
router.get('/signup',userController.rednerSignupForm)

router.post('/signup',wrapAsync(userController.signup))
         
//login route
router.get('/login',userController.renderLoginForm)

router.post("/login",
  passport.authenticate('local',{
    failureRedirect:"/login",
    failureFlash:true 
  }),
  userController.login  
)

//logout route
router.get('/logout',userController.logout)




module.exports= router