require('dotenv') .config()
const express= require('express')
const app = express()
const mongoose= require('mongoose')
const Listing = require('./models/listing.js')
const path= require('path')
const methodOverride= require('method-override')
const ejsMate = require('ejs-mate')
const session = require('express-session')
const ExpressError= require('./utils/ExpressError.js')
const passport= require('passport')
const localStrategy = require('passport-local')
const User= require('./models/user.js')

const flash= require('connect-flash')

const listingsRouter= require("./routes/listing.js")
const reviewsRouter = require('./routes/review.js')
const userRouter = require('./routes/user.js')
//database 
const MONGO_URL="mongodb://127.0.0.1:27017/Rentify"

main().then(()=>{
    console.log("connected to DB")
}).catch(err=>{
    console.log(err)
})


async function main()
{
    await mongoose.connect(MONGO_URL)
}

app.set('view engine','ejs')
app.set('views',path.join(__dirname,"views"))
//data parasing 
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,'/public')))
app.use('/uploads', express.static('uploads'));

const sessionOptions ={
    secret:"mysupersecretcode",
    resave:false,
    saveUnitialized:true,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}

app.get('/',(req,res)=>{
    res.send('root')
})

app.use(session(sessionOptions))
app.use(flash())

//for every request our passport is initalize
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())







//flash middleware
app.use((req,res,next)=>{
    res.locals.success = req.flash("success")
    res.locals.error= req.flash("error")
    res.locals.currUser= req.user

    next()
})





app.use('/listings',listingsRouter)
app.use('/listings/:id/reviews',reviewsRouter)
app.use('/',userRouter)




app.all('*',(req,res,next)=>{
    next(new ExpressError(404,"page not found"))
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render('error.ejs', { message, statusCode });
});


app.listen(8080,()=>{
    console.log('server is listeing to port 8080')
})
