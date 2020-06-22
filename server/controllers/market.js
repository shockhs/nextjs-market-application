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
    if (error) return res.status(400).send({ error: error.details[0].message });

    const { name, category, price, imageUrl } = req.body

    mysql.db.query(
        'INSERT INTO products SET ?',
        {
            id_owner: 2,
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
                return res.status(400).send({ message: "Something is wrong. Try again later" })
            }
            else return res.status(201).send({ message: 'Product added to db' })
        })
}

exports.editProduct = (req, res) => {
    const { error } = editProductValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const { name, category, price, imageUrl } = req.body
    const id = req.params.id
    const id_owner = 2
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
    const id_owner = 2
    mysql.db.query(
        `DELETE FROM products WHERE id = ${id} AND id_owner = ${id_owner}`,
        (error, result) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ message: "Something is wrong. Try again later" })
            } else if (result.affectedRows < 1) res.status(401).send({ message: 'Product is not deleted. Try again later' })
            else return res.status(200).send({ message: 'Product deleted from db' })
        })
}