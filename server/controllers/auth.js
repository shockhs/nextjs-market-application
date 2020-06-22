const mysql = require('../database/connect')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validators/auth')


exports.register = (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const { email, name, password } = req.body

    mysql.db.query(
        'SELECT email FROM users WHERE email = ?',
        [email],
        async (error, results) => {
            if (error)
                console.log(error);
            if (results.length > 0)
                return res.send({ message: 'That email is already in use', status: 400 })
            const hashedPassword = await bcrypt.hash(password, 8)

            mysql.db.query(
                'INSERT INTO users SET ?',
                { email, name, password: hashedPassword, date: new Date(Date.now()) },
                (error, results) => {
                    if (error)
                        console.log(error)
                    else return res.status(201).send({ message: 'User registered' })
                })
        })
}

exports.logout = (req, res) => {
    res.clearCookie('jwt')
    res.status(200).send({ message: 'Logout is complete' })
}

exports.login = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message, status: 400 });

    try {
        const { email, password } = req.body

        mysql.db.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            async (error, results) => {
                if (results.length < 1 || !(await bcrypt.compare(password, results[0].password)))
                    return res.status(401).send({ message: 'Email or Password is incorrect', status: 401 })
                else {
                    const user = { id: results[0].id, name: results[0].name, email: results[0].email }
                    const token = jwt.sign(user, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    })

                    const cookieOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        sameSite: 'none',
                        secure: true
                    }

                    res.cookie('jwt', token, cookieOptions)
                    res.status(200).send({ message: 'Login is complete', token, status: 200 })
                }
            }
        )
    } catch (error) {
        console.log(error);
    }
}