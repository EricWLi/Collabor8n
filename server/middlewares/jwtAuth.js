const jwtUtil = require('../lib/jwtUtil');
const UnauthorizedError = require('../errors/UnauthorizedError');

const jwtAuthentication = (options = { allowGuests: false }) => {
    return (req, res, next) => {
        try {
            const authorizationHeader = req.get('Authorization');
        
            if (!authorizationHeader) {
                if (options.allowGuests) {
                    return next();
                }

                throw new UnauthorizedError('Authorization token is missing.');
            }
        
            const tokenRegex = /^Bearer (.*)$/i;
            const match = authorizationHeader.match(tokenRegex);
        
            if (!match || match.length < 2) {
                throw new UnauthorizedError('Invalid header format. Format: Authorization: Bearer {token}');
            }
        
            const token = match[1];

            // Store decoded JWT token in the request object to be used by the next middleware.
            req.jwt = jwtUtil.validateToken(token);
        } catch (err) {
            if (err instanceof UnauthorizedError) {
                return res.status(401).json({ error: { message: `Unauthorized: ${err.message}` }});
            }
        }
    
        next();
    };
};

module.exports = jwtAuthentication;