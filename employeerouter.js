
const router=require("express").Router()
const ObjectID=require("mongodb").ObjectID
const arrayofEmployees=[{Name:"Sunny"}, {Age:21}]
const Database=require("./Database")
class EmployeeRouter{
    static get(){

        //     const MongoClient=require("mongodb").MongoClient
        //     const url="mongodb://localhost:27017"
        //     const dbName="employees"
        //     const client=new MongoClient(url).connect((err,conn)=>{
        //         if(!err){
        //             const db=conn.db(dbName)
        //             const collection=db.collection("employeedetails")
        //             collection.find({},{}).toArray((err,docs)=>
        //                 {if (!err) 
        //                     res.status(200).send(docs)
        //                     else
        //                     res.status(500).send(`${err}`)    
        //                 })
        //         }else
        //             res.status(500).send()
        //     })

        
        router.get("/",(req,res)=>{
            new Database().read({
                criteria:{},
                projection:{},
                collection:"employeedetails",
                callback:docs=>
                res.send(docs)
            })

            
        })
        
        router.post("/",(req,res)=>{

            new Database().insert({
                    collection:"employeedetails",
                    payload:req.body,
                    callback:(err,rowsInserted)=>{
                        if(!err)
                        res.status(200).send(rowInserted)
                        else
                        res.status(500).send(err)
                    }

            })
                // arrayofEmployees.push({})
                // console.log(req.body)
                // res.send("Data Created").status(200)
        })
        
        router.put("/",(req,res)=>{

            new Database().update({
                collection:"employeedetails",
                criteria:{"_id":new ObjectID(req.body.criteria._id)},
                payload:req.body.payload,
                callback:(err,rowUpdated)=>{ 
                    if(!err)
                    res.status(200).send(rowUpdated)
                    else
                    res.status(500).send(err)
                }
            })
            // res.send("Data Updated")
        })
        
        router.delete("/",(req,res)=>{

            new Database().delete({
                collection:"employeedetails",
                criteria:{"_id":new ObjectID(req.body.criteria._id)},
                callback:(err,rowDeleted)=>{
                    if(!err)
                    res.status(200).send(rowDeleted)
                    else
                    res.status(500).send(err)
                }
            })
            // res.send("Data Deleted")
        })

        return router
    }
}


module.exports=EmployeeRouter