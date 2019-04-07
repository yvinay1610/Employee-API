const MongoClient=require('mongodb').MongoClient
class Database{
    constructor(){
        function connect(){
            return new Promise((resolve,reject)=>{
                new MongoClient("mongodb://localhost:27017",{ useNewUrlParser: true }).connect().then(con=>resolve(con)).catch(err=>reject(err))

            })
        }

        this.read=function(readParams){
            return new Promise((resolve,reject)=>{
                connect().then(conn=>{
                    const db=conn.db("employees")
                    const collection=db.collection(readParams.collection)
                    collection.find(readParams.criteria).project(readParams.projection).toArray().then(docs=>resolve(docs)).catch(error=>reject(error))
                
                }).catch(error=>reject(error))
            })
        }

        this.insert=function(insertParams){
            return new Promise((resolve,reject)=>{
                connect().then(conn=>{
                    const db=conn.db("employees")
                    const collection=db.collection(insertParams.collection)
                    collection.insertOne(insertParams.payload).then(docs=>resolve(docs)).catch(error=>reject(error))

                }).catch(error=>reject(error))
            })
        }

        this.update=function(updateParams){
            return new Promise((resolve,reject)=>{
                connect().then(conn=>{
                    const db=conn.db("employees")
                    const collection=db.collection(updateParams.collection)
                    collection.updateOne(updateParams.criteria,{$set:updateParams.payload}).then(docs=>resolve(docs)).catch(error=>reject(error))
                
                }).catch(error=>reject(error))
            })
        
        }

        this.delete=function(deleteParams){
            return new Promise((resolve,reject)=>{
                connect().then(conn=>{
                    const db=conn.db("employees")
                    const collection=db.collection(deleteParams.collection)
                    collection.deleteOne(deleteParams.criteria).then(docs=>resolve(docs)).catch(error=>reject(error))

                }).catch(error=>reject(error))
            })
        
        }

    }
}

module.exports=Database