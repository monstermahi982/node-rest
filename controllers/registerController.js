import Joi from "joi";
import CustomerrorHandler from "../service/CustomerrorHandler";
import { User } from '../models'
import bcrypt from 'bcrypt'
import JwtService from "../service/JwtService";
// import User from "../models/user";

const registerController = {
    async register(req, res, next) {


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



        // checking user is already exist
        try {
            const exist = await User.exists({ email: req.body.email })
            if (exist) {
                return next(CustomerrorHandler.alreadyExists('This email is already taken'));
            }
        } catch (err) {
            return next(err);
        }

        // inserting into database
        const { name, email, phone, gender } = req.body;
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            name,
            email,
            phone,
            gender,
            password: hashPassword
        })

        let access_token;
        try {
            const result = await user.save();

            // creating token
            access_token = JwtService.sign({ _id: result._id });



        } catch (err) {
            return next(err);
        }





        res.json({ access_token: access_token });



    }
}

export default registerController;