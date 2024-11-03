import { response } from "express";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/ayncHandler.js";

const healthCheck = asyncHandler(async(request, response) => {
    return response.status(200).json(new ApiResponse(200,"connection test","test ok"))
});

export { healthCheck };