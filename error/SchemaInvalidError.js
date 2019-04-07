class SchemaInvalidError extends Error{
    constructor(errors){
        super()
        this.message="Invalid Schema"
        this.errors=errors
    }
}
module.exports = SchemaInvalidError  