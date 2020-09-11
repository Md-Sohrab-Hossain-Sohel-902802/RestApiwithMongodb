const express=require('express')
const router=express.Router()
const authenticate=require("../middlewere/authenticate")
const contactCTL=require("../controler/contactCt")
//GEt
router.get('/',contactCTL.getAllContactControler)


//Post
router.post('/',authenticate ,contactCTL.postNewContactController)

router.get('/:id', contactCTL.getSingleContact)
router.put('/:id',authenticate,contactCTL.editSingleContact)

router.delete('/:id', authenticate,contactCTL.deleteSingleContact)



module.exports=router