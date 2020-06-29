import Link from 'next/link';
import { useState } from 'react';
import styles from './Product.module.css';

export default function ({ product, setDeletedList, deletedList, authToken }) {
    const { name, id, price, category, imageUrl, add_date } = product
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState('')
    const handleDeleteClick = async event => {
        event.preventDefault()
        if (!isFetching) {
            setIsFetching(true)
            await fetch(`http://localhost:5000/api/market/delete/id=${id}`, {
                method: "DELETE",
                credentials: 'include',
                headers: {
                    "authorization": authToken
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === 200) {
                        setError('')
                        setDeletedList([...deletedList, id])
                    } else {
                        setError(res.message)
                    }
                    setIsFetching(false)
                })
        }
    }

    if (error !== '') {
        alert(error)
        setError('')
    }

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return <div className={styles.table}>
        <span>{id}</span>
        <span className={styles.name}>{name}</span>
        <span>{category}</span>
        <span>{price}</span>
        <div className={styles.image}>
            <img src={imageUrl} alt={name} />
        </div>
        <span>
            {new Date(add_date).toLocaleDateString("en-US", options)}
        </span>
        <div className={styles.actions}>
            <Link href={`/products/id/${id}`}>
                <a className={styles.link}>
                    Link
                </a>
            </Link>/
                <a className={styles.delete} onClick={handleDeleteClick} href="#">
                Delete
                </a>
        </div>
    </div>
}