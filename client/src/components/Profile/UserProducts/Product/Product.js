import Link from 'next/link';
import styles from './Product.module.css';

export default function ({ product }) {
    const { name, id, price, category, imageUrl, add_date } = product
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
            <Link href="#">
                <a className={styles.link}>
                    Link
                </a>
            </Link>/
             <Link href="#">
                <a className={styles.delete} >
                    Delete
                </a>
            </Link>
        </div>
    </div>
}