const express =require("express")
const app=express()
app.listen(8000)
console.log("Server Started")

const arrayofEmployees=[{Name:"Sunny"}, {Age:21}]
app.get("/employees",(req,res)=>{
    res.send(arrayofEmployees)
})

app.post("/employees",(req,res)=>{
    arrayofEmployees.push({})
    res.send("Data Created").status(200)
})

app.put("/employees",(req,res)=>{
    res.send("Data Updated")
})

app.delete("/employees",(req,res)=>{
    res.send("Data Deleted")
})
