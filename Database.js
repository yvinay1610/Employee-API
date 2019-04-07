const mongoClient=require('mongodb').MongoClient
class Database{
	constructor(){
		function connect(callback) {
		//	new mongoClient()
			mongoClient.connect("mongodb://localhost:27017",{ useNewUrlParser: true },(error,conn)=>{
				callback(conn)
			})
		}

		
		this.read=function (readParams) {
			connect (conn=>{
				const database=conn.db("employees")
				const collection=database.collection(readParams.collection)
				collection.find(readParams.criteria,readParams.projection).toArray(
					(err,docs)=>{
						if (!err) 
							readParams.callback(docs)
					})
				})
		}

		this.insert=function (insertParams) {
			connect (conn=>{
				const database=conn.db("employees")
				const collection=database.collection(insertParams.collection)
				collection.insertOne(insertParams.payload,(err,rows)=>{
					if(!err)
					console.log(`${rows}`)
					else
					console.log(`${err}`)
					conn.close()
					insertParams.callback(rows)

				})
			})
		}

		this.update=function (updateParams) {
			connect (conn=>{
				const database=conn.db("employees")
				const collection=database.collection(updateParams.collection)
				collection.updateOne(updateParams.criteria,{$set:updateParams.payload},
					(err,rows)=>updateParams.callback(err,rows))
			})
		}

		this.delete=function (deleteParams) {
				connect (conn=>{
					const database=conn.db("employees")
					const collection=database.collection(deleteParams.collection)
					collection.deleteOne(deleteParams.criteria,
						(err,rows)=>deleteParams.callback(err,rows))
				})
			}

	}
}

module.exports=Database
