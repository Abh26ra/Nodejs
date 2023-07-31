
const asyncHandler=require("express-async-handler")//it will automatically try catch the error in erroe handler whenever exception occur.
const User=require("../models/userModel");

const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser=asyncHandler(async(req,res)=>{
    const{username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    //existing user
    const userAvailable=await User.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered")
    }


//hash password
const hashedPassword=await bcrypt.hash(password,10)
console.log("Hashed Password: ",hashedPassword)

    
    //creating new user
const user=await User.create({
    username,
    email,
    password:hashedPassword,
});

console.log(`User created ${user}`);
//we dont want to show hashedpass
if(user){
    res.status(201).json({_id:user.id,email:user.email});
}
else{
    res.status(400);
    throw new Error("User data is not valid");
}
res.json({message:"Register the user"});
});

//@desc Register a user
//@route POST /api/users/register
//@access public
const loginUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user=await User.findOne({email});
    //compare pass with hash pass
    if(user && await bcrypt.compare(password,user.password)){
        //provide access token as response
        const accessToken=jwt.sign({
                 //payload which will embed in token
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },

        },process.env.ACCESS_TOKEN_SECRET,
          {expiresIn: "1m"}
         )
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("email or password not valid")
    }
   
})


//@desc Register a user
//@route POST /api/users/register
//@access public
const currentUser=asyncHandler(async(req,res)=>{
    res.json({message:"Current user information"});
})




module.exports={registerUser,
    loginUser,currentUser
}