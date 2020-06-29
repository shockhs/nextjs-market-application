const mysql = require('../database/connect')
const { addProductValidation, editProductValidation, categoryProductValidation } = require('../validators/market')

exports.getAllProducts = (req, res) => {
    mysql.db.query(
        'SELECT * FROM products',
        (error, result) => {
            if (error) {
                console.log(error)
                return res.status(400).send({ message: "Something is wrong. Try again later" })
            }
            else return res.status(200).send(result)
        })
}

exports.getProductsById = (req, res) => {
    const id_owner = req.currentUser.id
    mysql.db.query(
        `SELECT * FROM products WHERE id_owner=${id_owner}`,
        (error, results) => {
            if (error) {
                console.log(error)
                return res.send({ message: "Something is wrong. Try again later", status: 400 })
            }
            else return res.status(200).send({ data: results, status: 200 })
        })
}

exports.getProduct = (req, res) => {
    const id = req.params.id

    mysql.db.query(
        `SELECT * FROM products WHERE id = '${id}'`,
        (error, result) => {
            if (error || result.length < 1) {
                console.log(error)
                return res.status(400).send({ message: "Something is wrong. Try again later" })
            }
            else return res.status(200).send(result[0])
        })
}


exports.getCategoryProducts = (req, res) => {
    const { error } = categoryProductValidation({ category: req.params.category });
    if (error) return res.status(400).send({ error: error.details[0].message });
    const category = req.params.category

    mysql.db.query(
        `SELECT * FROM products WHERE category = '${category}'`,
        (error, result) => {
            if (error) {
                console.log(error)
                return res.status(400).send({ message: "Something is wrong. Try again later" })
            }
            else return res.status(200).send(result)
        })
}


exports.addProduct = (req, res) => {
    const { error } = addProductValidation(req.body);
    if (error) return res.send({ message: error.details[0].message, status: 400 });

    const { name, category, price, imageUrl } = req.body
    mysql.db.query(
        'INSERT INTO products SET ?',
        {
            id_owner: req.currentUser.id,
            name,
            category,
            price,
            add_date: new Date(Date.now()),
            expires_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            imageUrl
        },
        (error, result) => {
            if (error) {
                console.log(error)
                return res.send({ message: "Something is wrong. Try again later", status: 400 })
            }
            else return res.status(201).send({ message: 'Product added to db', status: 201 })
        })
}

exports.editProduct = (req, res) => {
    const { error } = editProductValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const { name, category, price, imageUrl } = req.body
    const id = req.params.id
    // NEED CHECK OWNER FIRST
    const id_owner = req.currentUser.id
    const edit_date = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
    mysql.db.query(
        `UPDATE products 
        SET name = '${name}', category = '${category}', price = ${price}, edit_date = '${edit_date}', imageUrl = '${imageUrl}'
        WHERE id = ${id} AND id_owner = ${id_owner}`,
        (error, result) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ message: "Something is wrong. Try again later" })
            }
            else return res.status(200).send({ message: 'Product updated in db' })
        })
}


exports.deleteProduct = (req, res) => {
    const id = req.params.id
    // NEED CHECK OWNER FIRST
    const id_owner = req.currentUser.id
    mysql.db.query(
        `DELETE FROM products WHERE id = ${id} AND id_owner = ${id_owner}`,
        (error, result) => {
            if (error) {
                console.log(error);
                return res.send({ message: "Something is wrong. Try again later", status: 400 })
            } else if (result.affectedRows < 1) res.send({ message: 'Product is not deleted. Try again later', status: 400 })
            else return res.status(200).send({ message: 'Product deleted from db', status: 200 })
        })
}


exports.buyArrayProducts = (req, res) => {
    const { stack } = req.body
    // NEED CHECK OWNER FIRST
    const id_buyer = req.currentUser.id
    mysql.db.query(
        `SELECT balance FROM accounts WHERE id_owner = ${id_buyer}`,
        async (error, results) => {
            if (error) {
                console.log(error);
                return res.send({ message: "Something is wrong. Try again later[1]", status: 400 })
            }
            if (results.length < 1)
                return res.send({ message: 'Account is not opened', status: 400 })
            const balance = results[0].balance
            mysql.db.query(
                `SELECT * FROM products WHERE id IN ` + `(${stack})`,
                (error, results) => {
                    if (error || results.length < 1) {
                        return res.send({ message: "Something is wrong. Try again later[2]", status: 400 })
                    }
                    let summary = 0;
                    for (let i = 0; i < results.length; i++) {
                        if (results[i].id_buyer !== null)
                            return res.send({ message: "Already purchased", status: 400, id: results[i].id })
                        summary += results[i].price
                    }
                    if (!(balance - summary >= 0))
                        return res.send({ message: 'You don`t have enough money for this operation', status: 400 })
                    const changeValue = summary
                    const buy_date = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
                    mysql.db.query(
                        `UPDATE products SET buy_date='${buy_date}', id_buyer=${id_buyer} WHERE id IN ` + `(${stack})`,
                        (error, results) => {
                            if (error) {
                                console.log(error);
                                return res.send({ message: "Something is wrong. Try again later[3]", status: 400 })
                            }
                            mysql.db.query(
                                `UPDATE accounts SET balance = balance - ${changeValue}, update_date = '${buy_date}' 
                                WHERE id_owner = ${id_buyer}`,
                                (error, results) => {
                                    if (error) {
                                        console.log(error);
                                        return res.send({ message: "Something is wrong. Try again later[4]", status: 400 })
                                    }
                                    return res.status(200).send({
                                        balance: -changeValue,
                                        buy_date,
                                        message: 'Buy offer succesfully completed',
                                        status: 200
                                    })
                                })
                        })
                })
        })
}

exports.buyProduct = (req, res) => {
    const id = req.params.id
    // NEED CHECK OWNER FIRST
    const id_buyer = req.currentUser.id
    mysql.db.query(
        `SELECT balance FROM accounts WHERE id_owner = ${id_buyer}`,
        async (error, results) => {
            if (error) {
                console.log(error);
                return res.send({ message: "Something is wrong. Try again later", status: 400 })
            }
            if (results.length < 1)
                return res.send({ message: 'Account is not opened', status: 400 })
            const balance = results[0].balance
            mysql.db.query(
                `SELECT * FROM products WHERE id = '${id}'`,
                (error, results) => {
                    if (error || results.length < 1) {
                        return res.send({ message: "Something is wrong. Try again later", status: 400 })
                    }
                    if (results[0].id_buyer !== null)
                        return res.send({ message: "Already purchased", status: 400 })
                    if (!(balance - results[0].price >= 0))
                        return res.send({ message: 'You don`t have enough money for this operation', status: 400 })
                    const changeValue = results[0].price
                    const buy_date = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
                    mysql.db.query(
                        `UPDATE products SET buy_date='${buy_date}', id_buyer=${id_buyer} WHERE id = ${id}`,
                        (error, results) => {
                            if (error) {
                                console.log(error);
                                return res.send({ message: "Something is wrong. Try again later", status: 400 })
                            }
                            mysql.db.query(
                                `UPDATE accounts SET balance = balance - ${changeValue}, update_date = '${buy_date}' WHERE id_owner = ${id_buyer}`,
                                (error, results) => {
                                    if (error) {
                                        console.log(error);
                                        return res.send({ message: "Something is wrong. Try again later", status: 400 })
                                    }
                                    return res.status(200).send({ balance: -changeValue, buy_date, message: 'Buy offer succesfully completed', status: 200 })
                                })
                        })
                })
        })
}