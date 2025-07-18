const express= require('express')
const wrapAsync = require('../utils/wrapAsync')
const Listing = require('../models/listing')
const router= express.Router()
const { listingSchema } = require('../schema.js');
const ExpressError = require('../utils/ExpressError')
const {isLoggedIn} = require('../middleware.js')

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

//index route
router.get("/",wrapAsync(async(req,res)=>{
  const allListings=  await Listing.find({})
  res.render('listings/index.ejs',{allListings})
}))

//New route
router.get('/new',isLoggedIn,(req,res)=>{
    //check if user is logged in or not 
    if(!req.isAuthenticated())
    {
        req.flash("error","you must be logged in to create Listing!")
       return  res.redirect('/listings')
    }
    res.render('listings/new.ejs')

})



//show route
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params
    const listing= await Listing.findById(id)
    .populate({path:"reviews",populate:{
        path:"author"
    }})
    .populate("owner")
    if(!listing)
    {
        req.flash("error","listing not exist")
        return res.redirect('/listings')
    }
    console.log(listing)
    res.render('listings/show.ejs',{listing})
}))

//create route
router.post('/',validateListing,wrapAsync(async(req,res,next)=>{
    const newListing= new Listing(req.body.listing)
    newListing.owner = req.user._id
    await newListing.save()
    req.flash('success',"New listing is created")
    res.redirect('/listings')
}))

//edit route
router.get("/:id/edit", isLoggedIn,wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');
    }
    res.render('listings/edit.ejs', { listing }); // ✅ Show edit form
}));

// ✅ Update route
router.put("/:id",isLoggedIn,validateListing,wrapAsync(async(req,res)=>{
    let{id}= req.params
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    req.flash('success',"listing updated")
    res.redirect(`/listings/${id}`)

}))


//delete route
router.delete('/:id',isLoggedIn,wrapAsync(async(req,res)=>{
    let{id} = req.params
    let deletedListing= await Listing.findByIdAndDelete(id)
    console.log(deletedListing)
    req.flash("success","listing deleted")
    res.redirect('/listings')
}))

module.exports= router