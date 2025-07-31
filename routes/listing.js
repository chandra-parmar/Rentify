const express= require('express')
const wrapAsync = require('../utils/wrapAsync')
const Listing = require('../models/listing')
const router= express.Router()
const { listingSchema } = require('../schema.js');
const ExpressError = require('../utils/ExpressError')
const {isLoggedIn} = require('../middleware.js')
const {storage} = require('../cloudConfig.js')
//parsing form data
const multer = require('multer')
const upload = multer({storage})

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};
const listingController = require('../controllers/listing.js')

//index route
router.get("/",wrapAsync(listingController.index))

//New route
router.get('/new',isLoggedIn,listingController.renderNewForm)



//show route
router.get("/:id",wrapAsync(listingController.showListing))

//search route
router.get('/listings/search',async(req,res)=>{
    const query = req.query.query

    if(!query)
    {
        return res.redirect('/listings')
    }

    try{
        const listings= await Listing.find(
            {
                name:{$regex : query ,$options:'i'}
            }
        )
         res.render('listings/index',{allListings:listings })
    }catch(error)
    {
        console.error('search error'+error)
        res.status(500).send('Server error during search')
    }
   
})

//create route
//router.post('/',isLoggedIn,validateListing,wrapAsync(listingController.createListing))

router.post("/",isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing))

//edit route
router.get("/:id/edit", isLoggedIn,wrapAsync(listingController.renderEditForm));

// ✅ Update route
router.put("/:id",isLoggedIn,validateListing,wrapAsync(listingController.updateListing))

 
//delete route
router.delete('/:id',isLoggedIn,wrapAsync(listingController.deleteListing))

module.exports= router