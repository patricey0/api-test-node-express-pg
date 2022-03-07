const JWT = require('jsonwebtoken');
//import config for secret
const { jwt_secret } = require(`../config`)

module.exports = {

    //method to create a token with the player id
    makeToken: playerId => {
        try {
            //directly return the token
            return JWT.sign(
                {
                    data: playerId
                },
                jwt_secret,
                {
                    algorithm: 'HS256',
                    expiresIn: '24h'
                }
            );
        } catch(error) {
            console.log(error);
            throw error;
        }
    },

    //token validation on verify
    validateToken: token => {
        try {

            return JWT.verify(
                token,
                jwt_secret,
                {
                    algorithms: ['HS256']
                }
            );
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
}