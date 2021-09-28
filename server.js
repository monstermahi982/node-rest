import express, { Router } from 'express';
import { APP_PORT } from './config';
import errorHandler from './middleware/errorHandler';
import routes from './router'

const app = express();

app.use(express.json())
app.use('/api', routes)
app.use(errorHandler);

app.listen(APP_PORT, () => {
    console.log(`running on port ${APP_PORT}`);
})