(async function(){
try{
    const express =require("express")
    const app=express()
    const ServerStartup=require("./ServerStartup")
    const bodyParser = require('body-parser')
    const cors=require('cors')
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.listen(8000)
    console.log("Server Started")
    
    const EmployeeRouter=require("./employeerouter")
    const Emp_Promises=require("./emp_Promises_router")
    const Emp_await=require("./emp_await_router")
    app.use("/employee",EmployeeRouter.get())         //arrow function
    app.use("/emp_Promises",Emp_Promises.get())
    app.use("/emp_await",Emp_await.get())
    await ServerStartup.loadloki()
    console.log(`Server started for Loki`)
    
}catch(e){
  console.log(`${e.message} - ${e.stack}`)
}
})() 
