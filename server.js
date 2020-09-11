const express=require("express")
var bodyParser = require('body-parser')
 const morgan=require("morgan")

const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost/contacts-db")
const db=mongoose.connection
db.on("error",(err)=>{
    console.log("Error")
})
db.once('open',()=>{
    console.log("Database Connection Established")
})




const contactRoute=require("./api/routes/contact")
const userRoute=require("./api/routes/user")





const cors=require('cors')
const app=express()


 app.use(morgan('dev'))
 app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT= process.env.PORT || 3050

app.use('/api/contacts',contactRoute)
app.use('/api/users',userRoute)

app.get('/',(req,res)=>{
    res.send("Hellow")
})
   






app.listen(PORT,()=>{
    console.log(`Server is Running on POrt ${PORT}`)
})

