import { useState } from 'react';
import { connect, useStore } from 'react-redux';
import { updateBalance } from '../../../store/actions/auth';
import { addToCart, removeFromCart } from '../../../store/actions/cart';
import Preloader from '../../commons/Preloader/Preloader';
import styles from './BuySection.module.css';


export default connect(state => ({ authToken: state.auth.authToken }), { updateBalance, removeFromCart, addToCart })
    (function ({ price, updateBalance, authToken, date, setBuyDate, id, name, removeFromCart, addToCart }) {
        const [isFetching, setIsFetching] = useState(false)
        const [error, setError] = useState('')
        const cartStatus = useStore().getState().cart.stack.hasOwnProperty(`${id}`)
        const [status, setStatus] = useState(cartStatus)

        const addToCartClickAction = event => {
            event.preventDefault()
            addToCart(id, name)
            setStatus(true)
        }

        const removeFromCartClickAction = event => {
            event.preventDefault()
            removeFromCart(id)
            setStatus(false)
        }

        const handleBuyButtonClick = async event => {
            event.preventDefault()
            setIsFetching(true)
            await fetch(`http://localhost:5000/api/market/buy/id=${id}`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "authorization": authToken
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === 200) {
                        setError('')
                        updateBalance(res.balance)
                        setBuyDate(res.buy_date)
                    } else {
                        setError(res.message)
                    }
                    setIsFetching(false)
                })
        }
        if (date === null) {
            return <div className={styles.container}>
                <div className={styles.price}>{price}</div>
                {!isFetching
                    ? <div className={styles.buttonSection}>
                        <button onClick={handleBuyButtonClick} className={styles.button}>buy now</button>
                        {!(status)
                            ? <button className={styles.button} onClick={addToCartClickAction}>Add to cart</button>
                            : <button className={styles.button} onClick={removeFromCartClickAction}>Delete from cart</button>}
                    </div>
                    : <Preloader />}
                <div className={styles.error}>
                    {error === '' ? null : error}
                </div>
            </div>
        }
        return <h1>{price} {date}</h1>
    })