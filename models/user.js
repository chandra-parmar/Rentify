const mongoose= require('mongoose')
const passportLocalMongoose= require('passport-local-mongoose')

const userSchema= new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        }
    }
)

//implement salting ,hashing, automatically
userSchema.plugin(passportLocalMongoose)

module.exports= mongoose.model("User",userSchema)