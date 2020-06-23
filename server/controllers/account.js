const mysql = require('../database/connect')
const { } = require('../validators/account')


exports.getBalance = (req, res) => {
    const id_owner = req.currentUser.id
    mysql.db.query(
        `SELECT balance FROM accounts WHERE id_owner = ${id_owner}`,
        async (error, results) => {
            if (error)
                console.log(error);
            if (results.length < 1)
                return res.send({ message: 'Account is not opened', status: 400 })
            else return res.status(200).send({ balance: results[0].balance, status: 200 })
        })
}


exports.createAccount = (req, res) => {
    const id_owner = req.currentUser.id
    mysql.db.query(
        `SELECT * FROM accounts WHERE id_owner = ${id_owner}`,
        async (error, results) => {
            if (error)
                console.log(error);
            if (results.length > 0)
                return res.send({ message: 'Account is already opened', status: 400 })

            mysql.db.query('INSERT INTO accounts SET ?', {
                id_owner,
                open_date: new Date(Date.now()),
                update_date: new Date(Date.now())
            }, (error, result) => {
                if (error) {
                    console.log(error)
                    return res.send({ message: "Something is wrong. Try again later", status: 400 })
                }
                else return res.status(201).send({ message: 'Account is opened', status: 201 })
            })
        })
}

exports.updateAccount = (req, res) => {
    const id_owner = req.currentUser.id
    const { changeValue } = req.body
    const update_date = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
    mysql.db.query(
        `SELECT balance FROM accounts WHERE id_owner = ${id_owner}`,
        async (error, results) => {
            if (error)
                console.log(error);
            if (results.length < 1) {
                res.send({ message: 'You don`t have opened account', status: 401 })
            } else if (results.length > 0 && results[0].balance + changeValue < 0)
                return res.send({ message: 'You don’t have enough money for this operation', status: 400 })

            mysql.db.query(
                `UPDATE accounts SET balance = balance + ${changeValue}, update_date = '${update_date}' WHERE id_owner = ${id_owner}`,
                (error, result) => {
                    if (error) {
                        console.log(error);
                        return res.send({ message: "Something is wrong. Try again later", status: 400 })
                    }
                    else return res.status(200).send({ message: 'Balance is changed', status: 200 })
                })
        })
}


exports.deleteAccount = (req, res) => {
    const id_owner = 2
    mysql.db.query(
        `DELETE FROM accounts WHERE id_owner = ${id_owner}`,
        (error, result) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ message: "Something is wrong. Try again later" })
            } else if (result.affectedRows < 1) res.status(401).send({ message: 'Account is not deleted. Try again later' })
            else return res.status(200).send({ message: 'Account deleted from db' })
        })
}
