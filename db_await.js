const MongoClient=require('mongodb').MongoClient
class Database{
    constructor(){
       async function connect(){ 
            try{
               // const conn=await MongoClient.connect("mongodb://localhost:27017",{ useNewUrlParser: true })
               const conn=await MongoClient.connect("mongodb+srv://yvinay1610:4wzlnse6s9f8OkNl@vinayasterixmongodb-sc7mz.mongodb.net/test?retryWrites=true",{ useNewUrlParser: true })
                return conn
            }
            catch(e)
            {
                throw e
            }
                
        }

            this.read=async function(readParams){
                try{
                    const connection=await connect()
                    const db=connection.db("employees")
                    const collection=db.collection(readParams.collection)
                    const docs=await collection.find(readParams.criteria).project(readParams.projection).toArray()
                    return docs
                }
                catch(e){
                    throw e
                }
            }

            this.readOne=async function (readOneParams){
                try{
                    const connection=await connect()
                    const db=connection.db("employees")
                    const collection=db.collection(readOneParams.collection)
                    const doc =await collection.findOne(readOneParams.criteria,readOneParams.projection)
                    return doc
                }
                catch(e){
                    throw e
                }
            }


            this.insert=async function(insertParams){
                try{
                    const connection=await connect()
                    const db=connection.db("employees")
                    const collection=db.collection(insertParams.collection)
                    const docs=await collection.insertOne(insertParams.payload)
                    return docs
                }
                catch(e){
                    throw e
                }
            }


            this.update=async function(updateParams){
                try{
                    const connection=await connect()
                    const db=connection.db("employees")
                    const collection=db.collection(updateParams.collection)
                    const docs=await collection.updateOne(updateParams.criteria,{"$set":updateParams.payload})
                    return docs
                }
                catch(e){
                    throw e
                }
            }
            

            this.delete=async function(deleteParams){
                try{
                    const connection=await connect()
                    const db=connection.db("employees")
                    const collection=db.collection(deleteParams.collection)
                    const docs=await collection.deleteOne(deleteParams.criteria)
                    return docs                
                }
                catch(e){
                    throw e
                }
            }
        }
    } 

    module.exports=Database