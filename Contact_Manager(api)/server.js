const express=require('express');
const errorHandler = require('./middleware/errorhandler');
const connectDb = require('./config/dbConnection');
const dotenv=require("dotenv").config();
const app=express();

connectDb();

const port=process.env.PORT || 5000;


//middleware
app.use(express.json());//provide a parser to parse the datastream which is received by the client
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});