const Listing = require('../models/listing')


//index controller
module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({})
    res.render('listings/index.ejs',{allListings})
}

module.exports.renderNewForm = (req,res)=>{
    res.render('listings/new.ejs')
}


module.exports.showListing = async(req,res)=>{
    let{id} = req.params
    const listing = await Listing.findById(id)
    .populate(
        {
            path:"reviews",
            populate:{
                path:"author"
            }
        }
    ).populate('owner')

    if(!listing)
    {
        req.flash('error',"listing you are requested for does not exist")
        res.redirect('/listings')
    }
    console.log(listing)
    res.render('listings/show.ejs',{listing})
}

module.exports.createListing = async(req,res,next)=>{
  let url =req.file.path
  let filename= req.file.filename
  console.log(url,"..",filename)
   const newListing= new Listing(req.body.listing)
   console.log(newListing)
   newListing.owner = req.user._id
   newListing.image ={url,filename}
   await newListing.save()
   req.flash('success',"New listing created!")
   res.redirect('/listings')

}

//edit form 
module.exports.renderEditForm = async(req,res)=>{
   let {id} = req.params
   const listing = await Listing.findById(id)
   if(!listing)
   {
    req.flash('error',"listing you requested for does not exits")
    res.redirect('/listings ')
   }
   res.render('listings/edit.ejs',{listing})
}


//update listing
module.exports.updateListing = async(req,res)=>{
    let {id } = req.params
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    req.flash('success',"listing updated!")
    res.redirect(`/listings/${id}`)
}

//delete listing
module.exports.deleteListing = async(req,res)=>{
      let{id } = req.params
      let deletedListing = await Listing.findByIdAndDelete(id)
      console.log(deletedListing)
      req.flash('success',"listing deleted")
      res.redirect('/listings')
}