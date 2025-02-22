class errApi extends Error {
    statusCode: Number;
    errors: string;
    data: any;
    success: boolean;

    constructor(statusCode: Number, message: string | "Something went wrong ", errors: string, stack: string){
        super(message);
        this.message = message; 
        this.statusCode = statusCode
        this.data = null
        this.errors = errors
        this.success = false

        if(stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}


export { errApi } 