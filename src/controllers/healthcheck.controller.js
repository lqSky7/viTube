import { response } from "express";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/ayncHandler";

const healthCheck = asyncHandler(async(request, response) => {
    return response.status(200).json(new ApiResponse(200,"none","test ok"))
});

export { healthCheck };