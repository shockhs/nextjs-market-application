import Link from 'next/link';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { removeToken } from '../../store/actions/auth';
import styles from './Header.module.css';

export default connect((state) => ({ isAuthenticated: state.auth.isAuthenticated }), { removeToken })(function Header({ isAuthenticated, removeToken }) {
    const router = useRouter()
    const logoutClick = (event) => {
        event.preventDefault()
        removeToken()
        router.push('/login')
    }
    const profileClick = (event) => {
        event.preventDefault()
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

                    {!isAuthenticated
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
                            <button onClick={profileClick} className={[styles.profileButton]}>Profile</button>
                            <button onClick={logoutClick} className={styles.logoutButton}>Logout</button>
                        </div>
                    }
                    <div className={styles.cart}>
                        <span className={styles.cartNumber}>0</span>
                        <img src="/cart.png" alt="User Cart" />
                    </div>
                </div>
            </div>
        </header>
    )
})

