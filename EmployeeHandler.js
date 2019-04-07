const ValidateFactory=require("./ValidateSchemaFactory")
const Database = require("./db_await")
const EMPLOYEE_POST_SCHEMA="employeePostSchema"
const EMPLOYEE_PUT_SCHEMA="employeePutSchema"
const EMPLOYEE_DELETE_SCHEMA="employeeDeleteSchema";
const ObjectID = require("mongodb").ObjectID
const lokicache=require("./lokicache") 
class EmployeeHandler{
 
    static async getAllEmployees(employee){
        try{
            return await new Employee().find()
        }
        catch(err){
            throw err
        }
    }


	static async create(employee){
		try{
			ValidateFactory.validate(EMPLOYEE_POST_SCHEMA,employee)
			return await new Employee().create(employee)
		}catch(err){
			throw err
		}
    } 
    
    
    static async update(updateEmployee){
		try {
			// statements
			ValidateFactory.validate(EMPLOYEE_PUT_SCHEMA,updateEmployee)
			return await new Employee().update(updateEmployee)
		} catch(e) {
			// statements
			console.log(e);
			throw e;
		}
	}



	static async delete(deleteEmployee){
		try {
			// statements
			ValidateFactory.validate(EMPLOYEE_DELETE_SCHEMA,deleteEmployee)
			return await new Employee().delete(deleteEmployee);
		} catch(e) {
			// statements
			console.log(e);
			throw e;
		}
	}

	static async getOneEmployee(id){
		try{
			const employee=await new Employee().findEmployee(id)
		    return employee
		}
		catch(e){
			throw e
		}
	}

	static async updateOneEmployee(id){
		try{
			return await new Employee().updateOneEmp(id)
		}
		catch(e){
			throw e
		}
	}

	static async createOneEmployee(id){
		try{
			return await new Employee().createOneEmp(id)
		}
		catch(e){
			throw e
		}
	}

	async deleteOneEmployee(deleteEmployee){
        try{
            return await new Employee().deleteEmp(deleteEmployee)
        }
        catch{
            throw e
        }

    }


}

class Employee{
	constructor(){
		this.collection="employeedetails"
		this.db=new Database()
	}
	
	async findEmployee(employeeId){
		try{
			const employee = await this.db.readOne({
				"collection":this.collection,
				"criteria":new ObjectID(employeeId),
				"projection":{}
			})
			return employee
		}catch(e){
			throw e
		}
	}

	async updateOneEmp(updateParams){
		try{
			const employee = await this.db.update({
				"collection":this.collection,
				"criteria":updateParams.criteria,
				"payload":{"$set":updateParams.payload}
			})
			return employee
		}
		catch(e){
			throw e
		}
	}

	async createOneEmp(insertParams){
		try{
			const employee = await this.db.insert({
				"collection":this.collection,
				"payload":insertParams.payload
			})
			return employee
		}
		catch(e){
			throw e
		}
	}

	async deleteEmp(deleteOneEmp){
			try{
				const employee=await this.db.delete({
					"collection":this.collection,
					"criteria":deleteOneEmp.criteria
				})
				return employee
			}
			catch(e){
				throw e
			}
		}
    
    async find(employee){
        try{
            return await this.db.read({"collection":this.collection,"criteria":{},"projection":{}})
        }
        catch(err){
            throw err
        }
    }


	async create(employee){
		try {
			return await this.db.insert({
                "collection":this.collection,
                "payload":employee})
		} catch(e) {
			// statements
			throw e;
		}
    }


    async update(updateEmployee){
		try {
			// statements
			return await this.db.update({
                "collection":this.collection,
                "criteria":{"_id":new ObjectID(updateEmployee.criteria.id)}, //updateEmployee.criteria
                "payload":updateEmployee.payload})
		} catch(e) {
			// statements
			console.log(e);
			throw e
		}
	}
		

	async delete(deleteEmployee){
		try {
			// statements
			return await this.db.delete({
                 "collection":this.collection,
                 "criteria":{_id:new ObjectID(deleteEmployee.id)}
                })
		} catch(e) {
			// statements
			console.log(e);
			throw e;
		}
	}
    
}

module.exports=EmployeeHandler