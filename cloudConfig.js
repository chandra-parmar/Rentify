const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')

cloudinary.config(
    {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret:process.env.CLOUD_API_SECRET
    }
)

//defining storage
const storage = new CloudinaryStorage(
    {
        cloudinary:cloudinary,
        params:{
            folder:"Rentify_dev",
            allowedFormats: ['png','jpg','jpeg'],
            public_id:(req,res)=> 'computed-filename-using-request'
        }
    }
)

module.exports={
     cloudinary,
     storage
}