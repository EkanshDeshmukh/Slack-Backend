import userRepository from '../repositories/userRepository.js';
import ValidationError from '../utils/error/validationError.js';

export const signUpService = async (data) => {
    try {
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        console.error('error in signUpService:', error);

        if (error.name === 'ValidationError') {
            throw new ValidationError({ error: error.errors }, error.message);
        }

        if (error.name === 'MongoServerError' && error.code === 11000) {
            throw new ValidationError(
                {
                    error: ['A user with the same email or username already exists']
                },
                'A user with the same email or username already exists'
            );
        }
        throw error;
    }
};
