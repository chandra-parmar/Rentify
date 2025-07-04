const express= require('express')
const app = express()
const mongoose= require('mongoose')
const Listing = require('./models/listing.js')
const path= require('path')
const methodOverride= require('method-override')
const ejsMate = require('ejs-mate')

const ExpressError= require('./utils/ExpressError.js')


const listings= require("./routes/listing.js")
const reviews = require('./routes/review.js')

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

app.get('/',(req,res)=>{
    res.send('root')
})





app.use('/listings',listings)
app.use('/listings/:id/reviews',reviews)

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
