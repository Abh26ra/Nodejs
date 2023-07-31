//Schema for users

const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the user name"]
    },

    email:{
        type:String,
        required:[true,"Please add the user email address"],
        unique:[true,"Email address already taken"],
    },
    password:{
        type:String,
        required:[true,"Please add the user password"],

    },
},
    {
        timestamps:true,//Mongoose will add two properties of type Date to your schema: createdAt : a date representing when this document was created. updatedAt : a date representing when this document was last updated.
    }
);


module.exports=mongoose.model("user",userSchema);