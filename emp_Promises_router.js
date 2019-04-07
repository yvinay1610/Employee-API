const router=require("express").Router()
const ObjectID=require("mongodb").ObjectID
const arrayofEmployees=[{Name:"Sunny"}, {Age:21}]
const Database=require("./db_promises")
class Emp_Promises_router{
    static get(){

        router.get("/",(req,res)=>{
            new Database().read({
                criteria:{},
                projection:{},
                collection:"employeedetails"
            }).then(docs=>res.send(docs)).catch(err=>res.status(500).send(err))
        })

        router.post("/",(req,res)=>{

            new Database().insert({
                criteria:{},
                projection:{},
                collection:"employeedetails",
                payload:req.body
            }).then(docs=>res.send(docs)).catch(err=>res.status(500).send(err))
        })


        router.put("/",(req,res)=>{
            new Database().update({
                collection:"employeedetails",
                criteria:{"_id": new ObjectID(req.body.criteria._id)},
                projection:{},
                payload:req.body.payload
            }).then(docs=>res.send(docs)).catch(error=>res.status(500).send(error))
        })


        router.delete("/",(req,res)=>{
            new Database().delete({
                collection:"employeedetails",
                criteria:{"_id": new ObjectID(req.body.criteria._id)}
            }).then(docs=>res.send(docs)).catch(error=>res.send(error).status(500))
        })

        return router 
    }
}

module.exports=Emp_Promises_router