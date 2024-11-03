class ApiResponse{
    constructor(statuscode , data, message = "success"){
        this.statuscode = statuscode;
        this.data = data;
        this.message = message;
        this.success = statuscode<400; // returns true or false, status code > 400 is considered as server side err
    }
}

export { ApiResponse };