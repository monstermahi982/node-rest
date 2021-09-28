import express from 'express';
import { registerController } from '../controllers';

const route = express.Router();

route.post('/register', registerController.register)


export default route