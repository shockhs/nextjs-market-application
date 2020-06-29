import Link from 'next/link';
import BuySection from '../../../components/Products/BuySection/BuySection';

export default function Category({ product }) {

    let { name, imageUrl, category, add_date, edit_date, price, buy_date, id } = product

    const arr = category.split('')
    const catName = arr[0].toUpperCase() + arr.slice(1, arr.length).join('')
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };


    if (edit_date === null) edit_date = add_date

    return (
        <div className="product">
            <div className="left">
                <img src={imageUrl} alt={`Image of ${name}`} />
            </div>
            <div className="right">
                <span className="name">{name}</span>
                <span className="span"><span className="title">Category:</span>
                    <Link href="/products/[category]" as={`/products/${category}`}>
                        <a className="categoryLink">
                            {catName}
                        </a>
                    </Link>
                </span>
                <span className="span">
                    <span className="title">Date added:</span> {new Date(add_date).toLocaleDateString("en-US", options)}
                </span>
                <span className="span">
                    <span className="title">Date updated:</span> {new Date(edit_date).toLocaleDateString("en-US", options)}
                </span>
                <BuySection price={price} date={buy_date} id={id} name={name} />
            </div>
            <style JSX scoped>
                {`
                    .product {
                        display:grid;
                        grid-template-columns: 50% 50%;
                        height:90vh;
                    }
                    .left {
                        display:flex;
                        align-items:center;
                        justify-content:center
                    }
                    .left img {
                        width:90%;
                        height:auto
                    }
                    .title {
                        font-weight:500
                    }
                    .right {
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                    }
                    .name {
                        font-size:32px;
                        font-weight:700;
                        margin-bottom:20px;
                    }
                    .right .span {
                        display:flex;
                        justify-content:space-between;
                        font-size:24px;
                    }
                    .span + .span {
                        margin-top:20px;
                    }
                `}
            </style>
        </div>
    )
}


Category.getInitialProps = async ({ query }) => {
    const { id } = query
    const res = await fetch(`http://localhost:5000/api/market/id=${id}`)
    const json = await res.json()
    return { product: json }
}
