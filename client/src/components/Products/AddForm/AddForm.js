import { useCallback, useState } from 'react'
import Preview from '../Preview/Preview'
import styles from './AddForm.module.css'

export default function ({ authToken }) {
    const categories = ['keyboards', 'monitors', 'servers', 'components']
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState('')
    const [isFetching, setIsFetching] = useState(false)
    const [successStatus, setSuccessStatus] = useState('')
    const product = { name, category, imageUrl, price }

    const clearFields = useCallback(() => {
        setError('')
        setName('')
        setCategory('')
        setImageUrl('')
        setPrice('')
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsFetching(true)
        await fetch("http://localhost:5000/api/market/add", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "authorization": authToken
            },
            body: JSON.stringify({ name, category, price, imageUrl })
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 201) {
                    setSuccessStatus(res.message)
                    setIsFetching(false)
                    clearFields()
                } else {
                    setError(res.message)
                    setIsFetching(false)
                }
            })
    }
    return (<div className={styles.page}>
        <form className={styles.form}>
            <div className={styles.title}>
                <h2>Add your product</h2>
            </div>
            <div className={styles.inputs}>
                <div className={styles.inputForm}>
                    <label htmlFor="name">Name: </label>
                    <input disabled={isFetching} type="text" name="name" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className={styles.inputForm}>
                    <label htmlFor="category">Category: </label>
                    <select disabled={isFetching} name="category" value={category} onChange={(event) => setCategory(event.target.value)}>
                        <option hidden defaultValue >Choose category</option>
                        {categories.map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className={styles.inputForm}>
                    <label htmlFor="price">Price: </label>
                    <input disabled={isFetching} type="number" value={price} name="price" onChange={(event) => setPrice(event.target.value)} />
                </div>
                <div className={styles.inputForm}>
                    <label htmlFor="imageUrl">Image URL: </label>
                    <input disabled={isFetching} type="text" name="imageUrl" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
                </div>
                {isFetching
                    ? <h4>Loading...</h4>
                    : <div className={styles.buttonPos}>
                        <button className={styles.button} onClick={handleSubmit}>add product</button>
                    </div>
                }
                {successStatus.length > 0
                    ? <div className={styles.successStatus}>
                        <span>{successStatus}</span>
                    </div>
                    : error.length > 0 ? <div className={styles.successStatus}>
                        <span>{error}</span>
                    </div> : null}
            </div>
        </form>
        <div className={styles.product}>
            <Preview product={product} />
        </div>
    </div>
    )
}