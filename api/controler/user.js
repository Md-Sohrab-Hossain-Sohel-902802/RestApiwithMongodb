const User=require("../model/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const registerUserControler=(req,res,next)=>{
    
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            res.json({
                erro:err
            })
        }

    
        let user=new User({
            email:req.body.email,
            password:hash
        })
        user.save()
            .then(usersave=>{
                res.status(201).json({
                    user:usersave
                })
            })
            .catch(error=>{
                res.json({
                    error
                })
            })
        
    })
    
    

}



const getAllUser=(req,res,next)=>{
    User.find()
        .then(result=>{
            res.json({
                message:"All Users",
                user:result
            })
        })
}
const getSingleUser=(req,res,next)=>{
    let id=req.params.id
    User.findById(id)
        .then(result=>{
            res.json({
                user:"Single Users",
                user:result
            })
        })
        .catch(err=>{
            res.json({
                message:"Error Occured",
                error:err
            })
        })
}

const loginController=(req,res,next)=>{
    let email=req.body.email
    let password=req.body.password

    User.findOne({email})
        .then(user=>{
            if(user){
               bcrypt.compare(password,user.password,(err,result)=>{

                    if(err){
                        res.json({
                            message:"Error Ocured"
                        })
                    }if(result){

                        let token=jwt.sign({email:user.email,_id:user._id},"SECRET",
                        {expiresIn:'2h'})
                        res.json({
                            message:"Login Successfull",
                            token
                        })
                    }else{
                        res.json({
                            message: "Login Failed, Password DoesNot Match"
                        })
                    }


               }) 
            }else{
                res.json({
                    message:"User Not Found"
                })
            }
        })






}









module.exports={
     registerUserControler,
     getAllUser,
     getSingleUser,
     loginController

}