class errApi extends Error {
    statusCode: string;
    errors: Array<string>;
    data: any;
    success: boolean;

    constructor(statusCode: string, message: string | "Something went wrong ", errors: Array<string>, stack: string){
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