import { DEBUG_MODE } from '../config';
import { ValidationError } from 'joi'
import CustomerrorHandler from '../service/CustomerrorHandler';


const errorHandler = (err, req, res, next) => {
    let status_code = 500;
    let data = {
        message: 'Internal Server Error',

        ...(DEBUG_MODE === 'true' && { original_error: err.message })

    }

    if (err instanceof ValidationError) {
        status_code = 422;
        data = {
            message: err.message
        }
    }

    if (err instanceof CustomerrorHandler) {
        status_code = err.status;
        data = {
            message: err.message
        }
    }


    return res.status(status_code).json(data);

}

export default errorHandler;