const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (payload, option) => {
    return jwt.sign(payload, JWT_SECRET, option);
}

const validateToken = () => {};

module.exports = {
    JWT_SECRET,
    createToken,
    validateToken
};