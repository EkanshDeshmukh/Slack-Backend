import { StatusCodes } from "http-status-codes";

class ClientError extends Error {
    constructor(error){
        super();
        this.name = "ClientError";
        this.message = error.message || "Client Error";
        this.explanation = error.explanation || "Client Error"; 
        this.statusCode = error.statusCode || StatusCodes.BAD_REQUEST;
    }
}

export default ClientError;