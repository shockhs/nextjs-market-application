const jwt = require('jsonwebtoken');
const mysql = require('../database/connect')

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).end('You need to login first')
    }
    let decodedTokenData
    try {
        decodedTokenData = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    } catch {
        return res.send({ message: 'You need to login first', status: 403 })
    }
    mysql.db.query(
        `SELECT id FROM users WHERE email = '${decodedTokenData.email}' AND id = ${decodedTokenData.id} AND name = '${decodedTokenData.name}'`,
        async (error, results) => {
            if (error)
                console.log(error);
            if (results.length < 1)
                return res.send({ message: 'User not found', status: 400 })
        })
    req.currentUser = { id: decodedTokenData.id, username: decodedTokenData.name, email: decodedTokenData.email };
    return next();
}