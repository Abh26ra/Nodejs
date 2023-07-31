const express=require('express');
const app=express();

const ejs=require('ejs');
app.set(('view engine'),'ejs');
app.use(express.static('public'));    //for using css and other things

const bodyParser=require('body-parser');//to fetch data
app.use(bodyParser.urlencoded({extended:true}))

let users=[]
//routes
app.get('/',(req,res)=>{
       res.render('home');
})

app.post('/register',(req,res)=>{
   //console.log(req.body.name,req.body.email);
   let user={
      name:req.body.name,
      email:req.body.email
   }
   users.push(user)
   console.log(users)
})


app.listen(3000,()=>{
   console.log("Server is running on port 3000");
})