import Link from 'next/link';
import styles from './Preview.module.css';

export default function ({ product, isProductPreview }) {
    const { name, price, add_date, edit_date, expires_date, id_owner, imageUrl,/*name_owner*/ } = product
    let arr, category;
    if (product.category.length > 0) {
        arr = product.category.split('')
        category = arr[0].toUpperCase() + arr.slice(1, arr.length).join('')
    }
    return (
        <div className={styles.product}>
            <div className={styles.image}>
                <img src={imageUrl} alt={name} />
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
                    <button >Add to Cart</button>
                    <button >About</button>
                </div>
            </div>
        </div >
    )
}