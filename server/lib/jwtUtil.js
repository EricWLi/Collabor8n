const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (payload, option) => {
    return jwt.sign(payload, JWT_SECRET, option);
}

const validateToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            throw new UnauthorizedError(err.message);
        }

        throw err;
    }
    
};

module.exports = {
    JWT_SECRET,
    createToken,
    validateToken
};