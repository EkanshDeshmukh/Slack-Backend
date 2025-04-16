import { StatusCodes } from "http-status-codes";
import {signUpService} from "../services/userService.js";
import {internalServerError, successResponse,customErrorResponse} from "../utils/common/responseObject.js";

export const signUpController = async (req, res) => {
    try {
        const user = await signUpService(req.body);
        return res.status(StatusCodes.CREATED).json(successResponse(user, "User created successfully"));
    } catch (error) {
        console.log('Error in signUpController:', error);
        if(error.StatusCodes){
            return res.status(error.StatusCodes).json(customErrorResponse(error.message, error.StatusCodes));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
}