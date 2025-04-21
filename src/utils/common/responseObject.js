export const internalServerError = (error = {}) => {
    return {
        success: false,
        err: error,
        data: {},
        message: error.message || 'Internal server error',
    };
};

export const successResponse = (data = {}, message = 'Success') => {
    return {
        success: true,
        err: {},
        data: data,
        message: message,
    };
};

export const customErrorResponse = (error = {}) => {
    if (!error.message && !error.explanation) {
        return internalServerError(error);
    }
    return {
        success: false,
        err: error.explanation || error,
        data: {},
        message: error.message || 'Internal server error',
    };
};
