import Preview from './Preview/Preview'
import styles from './Products.module.scss'

export default function ({ products }) {
    if (!products.length) return <h3>Список пуст</h3>
    const list = products.filter(item => item.buy_date === null)
    return <ul className={styles.products}>
        {list.map(product => {
            return <li key={product.id}><Preview product={product} /></li>
        })}
    </ul>
}