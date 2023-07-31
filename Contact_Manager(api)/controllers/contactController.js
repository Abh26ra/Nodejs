
const asyncHandler=require("express-async-handler")//it will automatically try catch the error in erroe handler whenever exception occur.

const Contact=require("../models/contactModel");


//labels

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find()//connection estab to database
    res.status(200).json(contacts)
})

//@desc Create Newcontacts
//@route POST /api/contacts
//@access public
const CreateContact=asyncHandler(async(req,res)=>{

    console.log("The request body is:",req.body)
     const{name,email,phone}=req.body;
     if(!name ||!email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory")
     }   

     const contact=await Contact.create({
        name,
        email,
        phone
     })

    res.status(201).json(contact)
})

//@desc Getcontacts
//@route GET/api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({ _id: req.params.id });
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
  
    res.status(200).json(contact);
  });

//@desc Update contacts
//@route PUT /api/contacts/:id
//@access public
const UpdateContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id );
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
  
    //res.status(200).json({message:`Update contact for${req.params.id}`})//req. param() searches the URL path, body, and query string of the request (in that order) for the specified parameter
    res.status(200).json(updatedContact);
})


//@desc Update contacts
//@route DELETE /api/contacts/:id
//@access public
const deleteContact=asyncHandler(async(req,res)=>{
//     const contact = await Contact.findById(req.params.id );
  
//     if (!contact) {
//       res.status(404);
//       throw new Error("Contact not found");
//     }
//     await Contact.remove();

//     //res.status(200).json({message:`Delete contact for${req.params.id}`})
//     res.status(200).json(contact);
// });
const contact = await Contact.findOneAndDelete({ _id: req.params.id });

if (!contact) {
  res.status(404);
  throw new Error("Contact not found");
}

res.status(200).json({ message: "Contact deleted successfully" });
})


    
module.exports={
    getContacts, getContact,CreateContact,UpdateContact,deleteContact};

    //all these are methods