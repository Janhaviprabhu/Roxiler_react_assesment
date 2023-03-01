const express=require('express')
const mongoose=require('mongoose')

const app=express()
app.use(express.json())

const data=require('./db.json')
console.log(data)
app.get('/',(req,res)=>{
    res.send('hello')
})

// mongoose.connect("",()=>{
    app.listen(8080,()=>{
        console.log("listening on port http://localhost:8080")
    })
// })