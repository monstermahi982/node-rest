import express, { Router } from 'express';
import { APP_PORT, DB_URL } from './config';
import errorHandler from './middleware/errorHandler';
import routes from './router'
import mongoose from 'mongoose'

const app = express();


mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'conn error'));
db.once('open', () => {
    console.log('DB connected');
});

app.use(express.json())
app.use('/api', routes)
app.use(errorHandler);


app.listen(APP_PORT, () => {
    console.log(`running on port ${APP_PORT}`);
})