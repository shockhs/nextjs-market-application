import Head from 'next/head';
import { useState } from 'react';
import { connect } from "react-redux";
import Good from '../components/Cart/Good';
import Preloader from '../components/commons/Preloader/Preloader';
import { updateBalance } from '../store/actions/auth';
import { resetState } from '../store/actions/cart';

export default connect(state => ({ cart: state.cart, authToken: state.auth.authToken }), { resetState, updateBalance })
    (function ({ cart, updateBalance, authToken, resetState }) {
        const { stack, counter, names } = cart
        const [isSuccess, setIsSuccess] = useState(false)
        const [isFetching, setIsFetching] = useState(false)
        const [error, setError] = useState('')
        const currentStack = Object.entries(stack);
        const stackIDs = Object.keys(stack).map(Number)


        const handleBuyClick = async event => {
            event.preventDefault()
            setIsFetching(true)
            await fetch(`http://localhost:5000/api/market/buy`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "Content-Type": 'application/json',
                    "authorization": authToken
                },
                body: JSON.stringify({ stack: stackIDs })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === 200) {
                        setError('')
                        updateBalance(res.balance)
                        setIsSuccess(true)
                        resetState()
                    } else {
                        setError(res.message)
                    }
                    setIsFetching(false)
                })
        }


        return (
            <>
                <Head>
                    <title>Products Page</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main>
                    <div className="goods">
                        <div className="section">
                            <span>Name of product</span>
                            <span className="qty">Quantity</span>
                        </div>
                        {currentStack.length > 0
                            ? currentStack.map(item => {
                                return <Good key={item[0]} id={item[0]} name={names[item[0]]} count={item[1]} />
                            })
                            : <div className="clear">Cart is clear</div>}

                        {isSuccess
                            ? <div className="success">Thank you for purchasing</div>
                            : < div className="buttonDiv">
                                {isFetching
                                    ? <div className="preloader"> <Preloader /></div>
                                    : currentStack.length > 0
                                        ? <div className="button">
                                            <button onClick={handleBuyClick}>Buy now / <span className="counter">{counter}</span></button>
                                        </div>
                                        : null
                                }
                                {error !== '' ? <div className="error">{error}</div> : null}
                            </div>}

                    </div>
                </main>
                <style JSX scoped>
                    {`
                    .goods{
                        margin-top:20px;
                    }
                    .section {
                        display:grid;
                        margin-bottom:10px;
                        grid-template-columns: 70% 30%;
                        font-size:24px;
                        font-weight:700;
                        border-bottom: 2px solid #000;
                        padding-bottom:10px;
                    }
                    .qty {
                        display:flex;
                        justify-content:center;
                    }
                    .buttonDiv {
                        display:flex;
                        margin-top:20px;
                    }
                    .clear {
                        font-size:24px;
                        display:flex;
                        justify-content:center;
                    }
                    .success {
                        font-size:24px;
                        color:green;
                        margin-top:20px;
                        font-weight:700;
                        display:flex;
                        justify-content:center;
                    }
                    .counter {
                        color:orange;
                    }
                    .button {
                        display:flex;
                        width:100%;
                        justify-content:flex-end;
                    }
                    .preloader {
                        display:flex;
                        width:100%;
                        justify-content:center;
                    }
                    .button button {
                        outline:none;
                        border:none;
                        width:200px;
                        padding: 5px 0;
                        background-color:#3d5af1;
                        color:#fff;
                        text-transform:uppercase;
                        font-size:24px;
                    }
                `}
                </style>
            </>
        )
    })

