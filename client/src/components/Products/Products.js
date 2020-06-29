import Preview from './Preview/Preview';
import styles from './Products.module.scss';

export default function ({ products }) {
    if (!products.length) return <h3>Список пуст</h3>
    console.log(products);
    const list = products.filter(item => item.buy_date === null && item.stock !== 0)
    return <ul className={styles.products}>
        {list.map(product => {
            return <li key={product.id}><Preview product={product} /></li>
        })}
    </ul>
}