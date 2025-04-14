import express from 'express';
import { StatusCodes } from 'http-status-codes';

import {PORT} from './config/serverConfig.js';

const app = express();

app.get('/', (req, res) => {
    res.status(StatusCodes.OK).send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});