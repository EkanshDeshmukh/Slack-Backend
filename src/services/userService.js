import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import userRepository from '../repositories/userRepository.js';
import { createJWT } from '../utils/common/authUtils.js';
import ClientError from '../utils/error/clientError.js';
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


export const signInService = async (data) =>{
    try {
        const user = await userRepository.getByEmail(data.email);
        if(!user) {
           throw new ClientError({
            explanation : "Invalid data sent from client",
            message : "No User is found from the email",
            statusCode : StatusCodes.NOT_FOUND,
           })
        }
        const isMatch = bcrypt.compareSync(data.password, user.password);
        if(!isMatch) {
            throw new ClientError({
                explanation : "Invalid data sent from client",
                message : "Password is not correct , please try again",
                statusCode : StatusCodes.UNAUTHORIZED,
            })
        }
        return {
            username : user.username,
            email : user.email,
            token: createJWT({id:user._id,email:user.email})
        }
    } catch (error) {
        console.log('User signIn error:', error);
    }
}