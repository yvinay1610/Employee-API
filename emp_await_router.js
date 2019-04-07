const router=require("express").Router()
const ObjectID=require("mongodb").ObjectID
const Database=require("./db_await")
const lokicache=require("./lokicache")
const AJV = require("ajv")
const AJVValidator = new AJV()
const validateEmployee = require("./EmployeeSchema")
const EmployeeHandler= require("./EmployeeHandler") 


class Emp_await_router{ 
    static get(){


        router.get("/:id",async(req,res)=>{
            try{
                const employee=await EmployeeHandler.getOneEmployee(req.params.id)
                res.status(200).send(employee)
            }
            catch(e){
                console.log(`${e.message}-${e.stack}`)
                res.status(500).send(e.message)
            }
        })

        router.put("/:id",async(req,res)=>{
            try{
                const employee=await  EmployeeHandler.updateOneEmployee({
                    collection:"employeedetails",
                    criteria:{"_id":new ObjectID(req.params.id)},    
                    payload:req.body
                })
                res.status(200).send(employee)
            }
            catch(e){
                console.log(`${e.message}-${e.stack}`)
                res.status(500).send(e.message)
            }
        })
        
        router.post("/", async(req,res)=>{
            try{
                const employee=await  EmployeeHandler.createOneEmployee({
                    collection:"employeedetails",    
                    payload:req.body
                })
                res.status(200).send(employee)
            }
            catch(e){
                console.log(`${e.message}-${e.stack}`)
                res.status(500).send(e.message)
                
            }
        })
        
        router.delete("/:id",async(req,res)=>{
            try{
                const employeeDeleted = await new EmployeeHandler().deleteOneEmployee({
                    collection:"employeedetails",
                    criteria:{"_id":new ObjectID(req.params.id)}
                })
                res.status(200).send(employeeDeleted)
            }
            catch(e){
                console.log(`${e.message}-${e.stack}`)
                res.status(500).send(e.message)
            }
        })


        router.get("/loki",async(req,res)=>{
            try{
                const docs = lokicache.get({"collection":"employeedetails","criteria":{},"projection":{"name":1}})
                res.status(200).send(docs)
            }
            catch(e)
            {
                console.log(`${e.message}-${e.stack}`)
                res.status(500).send (e)
            }
        })
           
        
        router.put("/loki", async (req, res) => {
            try {
                    const result  = await EmployeeHandler.update(req.body)
                    res.status(200).send(result)
            } 
            catch (err) {
                console.log(`${err.message} -  ${err.stack}`)
                res.status(500).send(err.message)
            }
        })


        router.get("/",async(req,res)=>{
            try{
                const docs=await new Database().read({
                    collection:"employeedetails",
                    criteria:{},
                    projection:{}                    
                })
                res.status(200).send(docs)
            }
            catch(e)
            {
                console.log(`${e.message}-${e.stack}`)
                res.status(500).send (e)
            }
        })
        

        router.post("/",async(req,res)=>{
            try{
                if (AJVValidator.validate(validateEmployee,req.body)) {
                const docs=await new Database().insert({
                    criteria:{},
                    projection:{},
                    collection:"employeedetails",
                    payload:req.body
                })
                res.status(200).send(docs) 
            }
            else{
                console.log(`${JSON.stringify(AJVValidator.errors,null,2)}`)
                const errors = AJVValidator.errors
                res.status(500).send(errors)
            }
            }
            catch(e)
            {
                console.log(`${e.message}-${e.stack}`)
                res.status(500).send (e)
            }
        })


        router.put("/",async(req,res)=>{
            try{
                if (AJVValidator.validate(validateEmployee,req.body)) {
                const docs=await new Database().update({
                    collection:"employeedetails",
                    criteria:{"_id":new ObjectID(req.body.criteria._id)},                  
                    payload:req.body.payload
                })
                res.status(200).send(docs)
            }
            else{
                console.log(`${JSON.stringify(AJVValidator.errors,null,2)}`)
                const errors = AJVValidator.errors
                res.status(500).send(errors)
            }
            }
            catch(e)
            {
                console.log(`${e.message}-${e.stack}`)
                res.status(500).send(e)
            }
        })


        router.delete("/",async(req,res)=>{
            try{
                const docs=await new Database().delete({
                    collection:"employeedetails",
                    criteria:{"_id":new ObjectID(req.body.criteria._id)}
                })
                res.status(200).send(docs)
            }
            catch(e){
                console.log(`${e.message}-${e.stack}`)
                res.status(500).send(e)
            }
        })       



        router.post("/new",async(req,res)=>{
        	try{
        		const result = await EmployeeHandler.create(req.body);
        		res.status(200).send(result);
        	}catch(err){
        		console.log(err.stack)
                res.status(500).send(err.message);
        	}
        
        })

        router.put("/new",async (req,res)=>{
            try {
                // statements
                const updateResult=await EmployeeHandler.update(req.body)
                res.status(200).send(updateResult);
            } catch(e) {
                // statements
                console.log(e);
                res.status(500).send(e.message);
            }
        })

        router.delete("/new",async (req,res)=>{
            try {
                // statements
                const deleteResult=await EmployeeHandler.delete(req.body)
                res.status(200).send(deleteResult)
            } catch(e) {
                // statements
                console.log(e);
                res.status(500).send(e.message)
            }
        })


        return router
    }
}

module.exports=Emp_await_router