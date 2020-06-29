import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Product from "./Product/Product";
import styles from './UserProducts.module.css';

export default connect(state => ({ authToken: state.auth.authToken }))
    (function ({ authToken }) {
        const [products, setProducts] = useState(null)
        const [deletedList, setDeletedList] = useState([])
        let active = null, history = null

        useEffect(() => {
            if (products !== null) {
                setProducts(products => products.filter(element => deletedList.indexOf(element.id) === -1))
            }
        }, [deletedList])

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


        if (products !== null) {
            active = products.filter(element => element.buy_date === null)
            history = products.filter(element => element.buy_date !== null)
        }

        return <>
            <h3 className={styles.title}>Active</h3>
            <ul className={styles.products}>
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
                    ? <span className={styles.blockers}>Loading...</span>
                    : active.length === 0
                        ? <span className={styles.blockers}>List is empty</span>
                        : active
                            .map(element => <li key={element.id}><Product authToken={authToken} product={element} setDeletedList={setDeletedList} deletedList={deletedList} /></li>)}
            </ul>

            <h3 className={styles.title}>History</h3>
            <ul className={styles.products}>
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
                    ? <span className={styles.blockers}>Loading...</span>
                    : history.length === 0
                        ? <span className={styles.blockers}>List is empty</span>
                        : history
                            .map(element => <li key={element.id}><Product authToken={authToken} product={element} setDeletedList={setDeletedList} deletedList={deletedList} /></li>)}
            </ul>
        </>
    })