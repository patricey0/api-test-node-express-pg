// JWT middleware to validate token
const jwt = require('../services/jwt');

jwt_mw = async (request, response, next) => {
    try {
        //getting token from header authorization field
        let token = request.headers['authorization'];
        console.log(`jwt-mw token: `, token);
        //return an invalid token response if no token
        if (!token) {
            return response.status(401).json('Invalid token');
        }
        const payload = jwt.validateToken(token);
        console.log( `jwt-mw payload : `, payload);
        //return an invalid token response if token do not match
        if (!payload.data) {
            return response.status(401).json('Invalid token');
        }
        request.userId = payload.data;
        next();
    } catch(error) {
        console.log(error);
        response.status(401).json(error.message);
    }
}

module.exports = jwt_mw;