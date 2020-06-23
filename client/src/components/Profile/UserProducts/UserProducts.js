import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Product from "./Product/Product";
import styles from './UserProducts.module.css';

export default connect(state => ({ authToken: state.auth.authToken }))
    (function ({ authToken }) {
        const [products, setProducts] = useState(null)
        useEffect(() => {
            const fetchData = async () => {
                await fetch("http://localhost:5000/api/market/user", {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': authToken
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 200) {
                            setProducts(res.data)
                        }
                    })
            }
            fetchData()
        }, [])

        return <ul className={styles.products}>
            <li className={styles.table}>
                <span>ID</span>
                <span>Name</span>
                <span>Category</span>
                <span>Price</span>
                <span>Image</span>
                <span>Date Added</span>
                <span>Actions</span>
            </li>
            {products === null
                ? <h1>Loading...</h1>
                : products.map(element => <li key={element.id}><Product product={element} /></li>)}
        </ul>
    })