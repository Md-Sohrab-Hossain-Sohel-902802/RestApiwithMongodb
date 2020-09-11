const express=require("express")
const router=express.Router()
const userControler=require("../controler/user")
const authentiate = require("../middlewere/authenticate")



router.post('/login',userControler.loginController)
router.post('/register',userControler.registerUserControler)
router.get("/", authentiate, userControler.getAllUser)
router.get("/:id",userControler.getSingleUser)

module.exports=router

