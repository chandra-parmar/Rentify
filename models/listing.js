const mongoose = require('mongoose');
const Schema = mongoose.Schema; // <-- This line defines Schema



const listingSchema=new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: 'defaultimage'
    },
    url: {
      type: String,
      default: 'https://unsplash.com/photos/a-small-brick-house-with-a-red-roof-nhLHN4TbXP4'
    }
  },
  price: Number,
  location: String,
  country: String
});

const Listing = mongoose.model('Listing',listingSchema)

module.exports = Listing
