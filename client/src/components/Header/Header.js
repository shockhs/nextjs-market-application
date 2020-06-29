import Link from 'next/link';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { removeToken } from '../../store/actions/auth';
import styles from './Header.module.css';

export default connect((state) => ({ auth: state.auth, counter: state.cart.counter }), { removeToken })
    (function Header({ auth, removeToken, counter }) {
        const router = useRouter()
        const logoutClick = async (event) => {
            event.preventDefault()
            await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    'authorization': auth.authToken
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === 200) {
                        removeToken()
                        router.push('/login')
                    }
                })
        }
        const profileClick = (event) => {
            event.preventDefault()
            router.push('/profile')
        }
        return (
            <header className={styles.header}>
                <div className="container">
                    <div className={styles.grid__div}>
                        <div className={styles.logotype}>
                            <Link href="/">
                                <a>
                                    market-app
                            </a>
                            </Link>
                        </div>

                        {!auth.isAuthenticated
                            ?
                            <ul className={styles.navigation}>
                                <li>
                                    <Link href="/">
                                        <a>
                                            Homepage
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/login">
                                        <a>
                                            Login
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/register">
                                        <a>
                                            Register
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                            : <div className={styles.authenticated}>
                                <Link href="/products/add">
                                    <a className={styles.addLink}>
                                        +
                                    </a>
                                </Link>
                                <button onClick={profileClick} className={[styles.profileButton]}>Profile /
                                
                                {auth.user.balance !== null ? <span className={styles.currentBalance}> {auth.user.balance}</span> : null}
                                </button>
                                <button onClick={logoutClick} className={styles.logoutButton}>Logout</button>
                            </div>
                        }
                        <div className={styles.cart}>
                            <div className={styles.cartBlock}>
                                <span className={styles.cartNumber}>{counter}</span>
                                <Link href="/cart">
                                    <a>
                                        <img src="/cart.png" alt="User Cart" />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    })

