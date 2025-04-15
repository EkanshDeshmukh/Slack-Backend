import express from 'express';

import connectDB from './config/db.js';
import {PORT} from './config/serverConfig.js';
import apiRoutes from './routes/apiRoutes.js';

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

app.use('/api',apiRoutes); 


app.listen(PORT, () => {
    connectDB()
        .then(() => console.log('MongoDB connected'))
        .catch((error) => console.error('MongoDB connection error:', error.message));
    console.log(`Server is running on port ${PORT}`);
});