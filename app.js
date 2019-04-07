

const express =require("express")
const app=express()
app.listen(8000)
console.log("Server Started")
app.get("/",(req,res)=>{
    // res.send("Hi")
    setTimeout(()=>
    res.send("Hi"),10000)
})