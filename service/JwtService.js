import { SECRET } from "../config";
import jwt from 'jsonwebtoken';

class JwtService {
    static sign(payload, expiry = '60', secret = SECRET) {
        return jwt.sign(payload, secret, { expiresIn: expiry });
    }
}

export default JwtService;