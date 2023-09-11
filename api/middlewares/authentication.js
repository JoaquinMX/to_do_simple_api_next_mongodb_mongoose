const { secret } = require('../../config')
const jwt = require('jsonwebtoken');

// Middleware para comprobar el login del usuario
function requireLogin(req, res, next) {

    if (!req.headers.authorization) {
        console.log('Unauthorized user access');
        return res.status(403).send({ message: "Need to authenticate first" })
    }

    try {
        const accessToken = req.headers.authorization.split(" ")[1];
        console.log(`token is: ${accessToken}`)
        payload = jwt.verify(accessToken, secret)
        console.log('Logged user accessing the site ' + payload.email);
        req.user = payload; 
        next()
    }
    catch (e) {
        // Maybe it expired, or something else even though the token is valid
        console.error(`error: ${e.message}`)
        return res.status(403).json("You need to login first")
    }
    
}

// Funcion para generar el token para el usuario
function generateToken(user) {
    let payload = {
        name: user.name,
        email: user.email,
        id: user.id,
        role: user.role
    };
    let oneDay = 60 * 60 * 24;
    return token = jwt.sign(payload, secret, { expiresIn: oneDay });
}

module.exports = { requireLogin, generateToken }