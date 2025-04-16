import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email already exists'],
            trim: true,
            lowercase: true, 
        },
        password:{
            type: String,
            required: [true, 'Email is required'],
        },
        username:{
            type: String,
            required: [true, 'Username is required'],
            unique: [true, 'Username already exists'],
            trim: true,
        },
        avatar:{
            type: String,
        }
},{timestamps: true}
);

userSchema.pre('save', function saveUser(next) {
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    user.password = bcrypt.hashSync(user.password, SALT);
    user.avatar = `https://robohash.org/${user.username}`;
    next();
})

const User = mongoose.model('User', userSchema);
export default User;