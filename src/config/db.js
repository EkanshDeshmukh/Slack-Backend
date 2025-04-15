import mongoose from "mongoose";

import { MONGODB_URI, MONGODB_URI_PROD, NODE_ENV } from "./serverConfig.js";

 
export default async function connectDB() {
    try {
      if (NODE_ENV === 'development') {
        await mongoose.connect(MONGODB_URI);
      } else if (NODE_ENV === 'production') {
        await mongoose.connect(MONGODB_URI_PROD);
      }
      console.log(`Connected to mongodb database from ${NODE_ENV} environment`);
    } catch (error) {
      console.log('Error connecting to database', error);
    }
  }
