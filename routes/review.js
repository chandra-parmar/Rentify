const express= require('express')
const router= express.Router({mergeParams:true})
const wrapAsync = require('../utils/wrapAsync.js')
const ExpressError= require('../utils/ExpressError.js')
const {listingSchema,reviewSchema}= require('../schema.js')
const Review = require('../models/review.js')
const Listing = require('../models/listing.js')
const {isLoggedIn, isReviewAuthor} = require('../middleware.js')
const validateReview=(req,res,next)=>{
    let{error}= reviewSchema.validate(req.body)
    if(error)
    {
        let errMsg= error.details.map((el)=> el.message).join(",")
        throw new ExpressError(400,errMsg)

    }
    else
    {
        next()
    }
}
const reviewController = require('../controllers/reviews.js') 
//review post route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview))


//delete route

router.delete('/:reviewId',isReviewAuthor,
    wrapAsync(reviewController.deleteReview)
)

module.exports=router