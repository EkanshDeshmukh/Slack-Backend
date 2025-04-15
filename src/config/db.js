import mongoose from "mongoose";

import { MONGODB_URI, MONGODB_URI_PROD, NODE_ENV } from "./serverConfig.js";

export default async function connectDB() {
    try {
        if (NODE_ENV === 'production') {
            await mongoose.connect(MONGODB_URI_PROD, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("MongoDB connected in production mode");
        } else if (NODE_ENV === 'development') {
            await mongoose.connect(MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("MongoDB connected in development mode");
        } else {
            console.warn("NODE_ENV is not set correctly.");
        }
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw error;
    }
}
