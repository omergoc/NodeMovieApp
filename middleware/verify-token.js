const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if(token) {
        jwt.verify(token,req.app.get('api_secret_key'), (err,decode) => {
            if(err){
                res.json({
                    status: false,
                    message: 'Failed to Authenticate Token.'
                });
            } else {
                req.decode = decode;
                next();
            }
        });
    } else {
        res.json({
            status: false,
            message: 'No Token Provided'
        });
    }
};