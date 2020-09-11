const mongoose=require("mongoose")
const Scheema=mongoose.Schema
const validator=require("validator")

const UserSchema=new Scheema({
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                return validator.isEmail(v)
            },
            message: `{VALUE} is not an email`
        }
    },
    password:{
        type: String,
        required:true
    }
})

const User=mongoose.model("User",UserSchema)
module.exports=User