import Joi from "joi";

const registerController = {
    register(req, res, next) {


        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(15).required(),
            email: Joi.string().email().required(),
            phone: Joi.number().required(),
            gender: Joi.string().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,15}$')).required(),
            confirm_password: Joi.ref('password')
        })


        const { error } = registerSchema.validate(req.body);

        if (error) {
            // res.json({ error: error.message })
            return next(error);
        }

        res.json(req.body)



    }
}

export default registerController;