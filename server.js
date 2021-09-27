import express, { Router } from 'express';
import { APP_PORT } from './config';
import routes from './router'

const app = express();

app.use('/api', routes)


app.listen(APP_PORT, () => {
    console.log(`running on port ${APP_PORT}`);
})