const express= require('express')
const router= express.Router()
const User = require('../models/user')
const wrapAsync= require('../utils/wrapAsync')
const passport= require('passport')
const { saveRedirectUrl } = require('../middleware')



router.get('/signup',(req,res)=>{
    res.render('users/signup.ejs')
    
})

router.post('/signup',wrapAsync(async(req,res)=>{
    try{
         let{username,email,password} = req.body
         const newUser= new User({email,username})
         const registeredUser = await User.register(newUser,password)
          console.log(registeredUser)
          req.login(registeredUser,(err)=>{
            //automatically login after sign up
            if(err)
            {
              return next(err)
            }
        req.flash('success',"welcome to Rentify!")
         res.redirect(req.session.redirectUrl)
          })
         
    }catch(e)
    {
      req.flash('error',e.message)
      res.direct('/signup')  
    }
   
}))

//login route
router.get('/login',saveRedirectUrl,(req,res)=>{
  res.render('users/login.ejs')
})

router.post("/login",
  passport.authenticate('local',{
    failureRedirect:"/login",
    failureFlash:true 
  }),
  async(req,res)=>{
    req.flash("success","welcome to Rentify ! you are logged in !")
    let redirectUrl= res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
  }
)

//logout route
router.get('/logout',(req,res,next)=>{
  req.logout((err)=>{
    if(err)
    {
      return next(err)
    }
    req.flash('success',"you are logged out !")
    res.redirect('/listings')
  })
})



module.exports= router