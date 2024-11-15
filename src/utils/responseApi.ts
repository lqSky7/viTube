class apiResponse{
    data: any;
    success: boolean;
    statusCode: number;
    message: string;

    constructor(statusCode: number,data: any, success: boolean, message: string = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.success = statusCode < 400;
        this.message = message;
    }
}

export { apiResponse }