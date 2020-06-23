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
    const id = req.currentUser.id
    const visitDate = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
    mysql.db.query(
        `UPDATE users 
                            SET visit_date = '${visitDate}'
                            WHERE id = ${id}`,
        (error, result) => {
            if (error) {
                console.log(error);
                return res.send({ message: "Something is wrong. Try again later [UPD]", status: 400 })
            }
        })
    res.status(200).send({ message: 'Logout is complete', status: 200 })
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
                    const user = {
                        id: results[0].id,
                        name: results[0].name,
                        email: results[0].email,
                        regDate: results[0].registration_date,
                        balance: null
                    }

                    mysql.db.query(
                        `SELECT balance FROM accounts WHERE id_owner = ${results[0].id}`,
                        async (error, results) => {
                            if (error)
                                console.log(error);
                            if (results.length > 0)
                                user.balance = results[0].balance
                                
                            const token = jwt.sign(user, process.env.JWT_SECRET, {
                                expiresIn: process.env.JWT_EXPIRES_IN
                            })
                            const visitDate = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
                            mysql.db.query(
                                `UPDATE users SET visit_date = '${visitDate}' WHERE id = ${user.id}`,
                                (error, result) => {
                                    if (error) {
                                        console.log(error);
                                        return res.send({ message: "Something is wrong. Try again later [UPD]", status: 400 })
                                    }
                                })
                            return res.status(200).send({ message: 'Login is complete', token, status: 200, user })
                        })
                }
            }
        )
    } catch (error) {
        console.log(error);
    }
}