const User = require('../models/user')

//signup form render 
module.exports.rednerSignupForm  = (req,res)=>{
    res.render('users/signup.ejs')
}



//signup controller
module.exports.signup = async(req,res)=>{
    try{
        let {username ,email,password} = req.body
        const newUser = new User({email,username})
        const registeredUser  = await User.register(newUser,password)
        console.log(registeredUser)
        req.login(registeredUser,(err)=>{
            if(err)
            {
                return next(err)
            }
            req.flash('success',"Welcome to Rentify")
            res.redirect('/listings')

        })
    }catch(error)
    {
        req.flash('error',error.message)
        res.redirect('/signup')

    }
}

//login form 
module.exports.renderLoginForm = (req,res)=>{
    res.render('users/login.ejs')

}

//login 
module.exports.login = async(req,res)=>{
    req.flash('success',"welcome back to Rentify!")
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err)
        {
            return next(err)
        }
        req.flash('success',"you are logged out")
        res.redirect('/listings')

    })
}
