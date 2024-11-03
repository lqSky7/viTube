class apiError extends Error {
    constructor(statuscode, message="something went wrong", error=[], stack=""){
    super(message) // calling the parent class constructor.     
        this.statuscode = statuscode
        this.message = message
        this.error = error
        this.stack = stack
        this.success = false
}
}

export  { apiError }