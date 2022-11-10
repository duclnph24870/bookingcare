const jwt = require('jsonwebtoken');

function createJwt (data) {
    let token = null;
    const pass = 'duclnph24870';

    try {
        token = jwt.sign(data,pass,{ expiresIn: '1h' });
    } catch (error) {
        console.log(error);
    }

    return token;
}

function verifyJwt (token) {
    let data = null;
    const pass = 'duclnph24870';

    try {
        data = jwt.verify(token,pass);
    } catch (error) {
        if (error.name == 'TokenExpiredError') {
            data = {
                status: 0,
                message: 'Token đã hết hạn'
            }
        }else {
            data = {
                status: 0,
                message: error.name + ' ' + error.message
            }
        }
    }

    return data;
}

module.exports = {
    createJwt,
    verifyJwt,
}

