const EmployeeHandler=require("./EmployeeHandler.js")
const loki = require("lokijs")
const lokicache=require("./lokicache")
class ServerStartup{
    static async loadloki(){
        try{
        console.log(`Loading Loki...`)            
         const employees =  await EmployeeHandler.getAllEmployees()          
         lokicache.load({"collection":"employeedetails","data":employees})
        }     
        catch(e){
            console.log(`${e.message} - ${e.stack}`)
            throw e
        }  
    }


    static getDataFromLoki(){
		return lokiCache.get({"collection":"employeedetails","criteria":{},"projection":{}});
    }

    static insertEmployeeInCache(insertParams){
        try{
            const docs=lokicache.load({"collection":"employeedetails",
        "data": insertParams.payload 
            })
        }catch(e){
                throw e
        }

    }

    // static async update(reqBody){
	// 	try{ 
	// 		ValidateFactory.validate(EMPLOYEE_PUT_SCHEMA,reqBody.payload)
	// 		new Employee().updateEmployeeInCache({
    //             criteria:{
	// 				name:reqBody.criteria.name,
	// 				_id:reqBody.criteria._id
	// 			},
	// 			payload:reqBody.payload
	// 		})
	// 		return await new Employee().updateEmployeeInDatabase(reqBody)
	// 	}catch(err){
	// 		throw err;
	// 	}
	// }

    static updateEmployeeInCache(updateParams){  
        try{
			console.log(`updateParams is ${JSON.stringify(updateParams,null,2)}`)
			const docs= lokicache.update({"collection":"employeedetails",
              "filterFunction":item=>{  
                        if( item.name === updateParams.criteria.name &&
                                item._id == updateParams.criteria._id){
								console.log(`item is:${item._id}`)  
								console.log("filterfunc"+item.name)
								console.log()
								return true
								
								}
								 
                        else{
							 return false}
						},
			   "updateFunction":
			function (item){
                           item.name = updateParams.payload.name
						   item.surname = updateParams.payload.surname
						   item.age=updateParams.payload.age
						 	console.log(`item is :${item}`) 
						   return item
			}
			  
		})}
		   catch(e){
			throw e
		}
	} 
    
    static deleteEmployeeInCache(deleteParams){
		try{
			console.log("deleteParams "+JSON.stringify(deleteParams,null,2))
			const docs=lokicache.delete({"collection":"employeedetails",
				"deletefunction":item=>{
					if(item._id==deleteParams.criteria._id){
					console.log(item)
					return true}else{
						return false
					}
				}

			})
		}catch(e){throw e}
	}
		
}
module.exports=ServerStartup 