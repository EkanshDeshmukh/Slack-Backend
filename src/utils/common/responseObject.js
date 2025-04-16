export const internalServerError = (message) => {
    return{
        success: false,
        err:error,
        data:{},
        message: message || 'Internal server error',
    }
}

export const successResponse = (data, message) => {
    return{
        success: true,
        err:{},
        data:data,
        message: message || 'Success',
    }
}

export const customErrorResponse = (error) =>{
    if(!error.message && !error.explanation){
        return internalServerError(error)
    }
    return{
        success: false,
        err:error.explanation,
        data:{},
        message: error.message || 'Internal server error',
    }
}