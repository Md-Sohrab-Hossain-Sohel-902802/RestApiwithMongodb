const Contact=require("../model/contact")
const getAllContactControler=(req,res,next)=>{
    Contact.find()
        .then(ct => {
            res.status(200).json({
                message: "All Contacts",
                contacts: ct
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error Occurred",
                error: err
            })
        })
}


const postNewContactController=(req,res,next)=>{

    const contact = new Contact({

        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email


    })

    contact.save()
        .then(data => {
            res.status(201).json({
                message: "Contact Added",
                contact: data
            })
        })
        .catch(err => console.log(err))
}

const getSingleContact=(req,res,next)=>{
    let id=req.params.id
    Contact.findById(id)
    .then(contact=>{
        res.status(200)  .json({
            contact
        })
    } )
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error Occurred",
                error: err
            })
        })
}



const deleteSingleContact=(req,res,next)=>{
    let id=req.params.id

    Contact.findByIdAndRemove(id)
        .then(result=>{
            res.json({
                message:"Item Deleted",
                result
            })
        }).catch(err=>{
            console.log(err)
        })

}

const editSingleContact=(req,res,next)=>{
    let id=req.params.id

    let updatedContact={
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email
    }
    Contact.findByIdAndUpdate(id,{$set:updatedContact})
        .then(contact=>{
            Contact.findById(contact._id)
                .then(newContact=>{
                     res.json({
                    message: "updated Succcessfully",
                    newContact
                })
                })
               
          
        })
        .catch(err=>console.log(err))
}






module.exports={
getAllContactControler,
postNewContactController,
getSingleContact,
    deleteSingleContact,
    editSingleContact
}