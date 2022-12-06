// create random tokens 
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        // get token from "header autorization"
        // split it because there are 2 elements :"bearer TOKEN"
        const token = req.headers.authorization.split(' ')[1];

        // verify token with secret key
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

        // get user id using token
        const userId = decodedToken.userId;

        // ?
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};