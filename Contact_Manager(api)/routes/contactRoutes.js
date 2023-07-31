const express=require('express');
const router=express.Router();
const {getContacts,
    getContact,
    CreateContact,
    UpdateContact,
    deleteContact}=require("../controllers/contactController")

//get
router.route('/').get(getContacts)

router.route('/').post(CreateContact)

//individual
router.route('/:id').get( getContact)
//update
router.route('/:id').put( UpdateContact)

router.route('/:id').delete(deleteContact)






module.exports=router;