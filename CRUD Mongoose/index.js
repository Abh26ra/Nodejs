const express=require('express');
const app=express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abhinayraja26:Raja26@cluster0.an5rdt2.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("connected")
})

//created schema
const usersSchema=new mongoose.Schema({
    name:String,
    email:String,
})

// //too add data to database model is used
// const createUser=async ()=>{
//       const User=mongoose.model('users',usersSchema);//model created
//       let data=new User({
//         name:'Abhinay',
//         email:'abhi26@gmail,com',
//       })

//       const result=await data.save();
//       console.log(result);
// }

// createUser();


//delete
// const deleteUser=async ()=>{
//           const User=mongoose.model('users',usersSchema);//model created
//           let data=await User.deleteOne({name:'Abhinay'})
    
//           //const result=await data.save();
//           console.log(data);
//     }

// deleteUser();

//findvalue
// const findUser=async()=>{
//     const User=mongoose.model('users',usersSchema)
//     let data=await User.find({name:'Abhinay'})
//     console.log(data);
// }
// findUser()


//Update Value
const updateUser=async()=>{
const User=mongoose.model('users',usersSchema)
let data=await User.updateOne(
    {name:'Abhinay'},
    { 
        $set:{name:'Raja'} 
    }  
)
    console.log(data);


}
updateUser();

app.listen(3000, ()=>{
    console.log("server is running");
})