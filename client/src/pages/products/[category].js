import Products from '../../components/Products/Products';

export default function Category({ products, category }) {
    const arr = category.split('')
    const catName = arr[0].toUpperCase() + arr.slice(1, arr.length).join('')
    return (
        <>
            <h2>Category: {catName}</h2>
            <Products products={products} />
        </>
    )
}


Category.getInitialProps = async ({ query }) => {
    const { category } = query
    const res = await fetch(`http://localhost:5000/api/market/category=${category}`)
    const json = await res.json()
    return { products: json, category }
}
