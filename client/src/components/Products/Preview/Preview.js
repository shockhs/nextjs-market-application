import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { connect, useStore } from 'react-redux';
import { addToCart, removeFromCart } from '../../../store/actions/cart';
import styles from './Preview.module.css';



export default connect(null, { addToCart, removeFromCart })
    (function ({ product, addToCart, removeFromCart }) {

        const router = useRouter()

        let arr, category;
        const { name, price, id, imageUrl,/*name_owner*/ } = product

        // NOT USING CONNECT CUZ OF RERENDERING ALL GOODS, NOW ONLY 1 RENDER
        const cartStatus = useStore().getState().cart.stack.hasOwnProperty(`${id}`)
        const [status, setStatus] = useState(cartStatus)


        // CATEGORY NAME FROM UPPER CHAR
        if (product.category.length > 0) {
            arr = product.category.split('')
            category = arr[0].toUpperCase() + arr.slice(1, arr.length).join('')
        }


        const aboutClickAction = event => {
            event.preventDefault()
            router.push(`/products/id/${id}`)
        }

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

        return (
            <div className={styles.product}>
                <div className={styles.image}>
                    <Link href="/products/id/[id]" as={`/products/id/${product.id}`}>
                        <a>
                            <img src={imageUrl} alt={name} />
                        </a>
                    </Link>
                </div>
                <div className={styles.description}>
                    <div className={styles.left_container}>
                        <div className={styles.name}>{name}</div>
                        <div className={styles.category}><span>Category: </span>
                            <Link href="/products/[category]" as={`/products/${product.category}`}>
                                <a className={styles.categoryLink}>
                                    {category}
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.price}>{price}</div>
                    <div className={styles.buttons}>
                        {!(status)
                            ? <button onClick={addToCartClickAction}>Add to Cart</button>
                            : <button onClick={removeFromCartClickAction}>Delete from Cart</button>}
                        <button onClick={aboutClickAction}>About</button>
                    </div>
                </div>
            </div >
        )
    })