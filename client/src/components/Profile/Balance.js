import { useState } from "react"
import { connect } from "react-redux"
import { updateBalance } from '../../store/actions/auth'
import styles from './Balance.module.css'

export default connect(state => ({ balance: state.auth.user.balance }), { updateBalance })
    (function ({ authToken, openButton, balance, setOpenButton, actionSetBalance, updateBalance }) {
        const [isFetching, setIsFetching] = useState(false)
        const [balanceInput, setBalanceInput] = useState(0)
        const [error, setError] = useState('')

        const handleAddBalanceButton = async (event) => {
            event.preventDefault()
            setIsFetching(true)
            setError('')
            if (balanceInput >= 100 && balanceInput <= 10000) {
                await fetch("http://localhost:5000/api/account/", {
                    method: "PUT",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': authToken
                    },
                    body: JSON.stringify({ changeValue: balanceInput })
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 200) {
                            updateBalance(balanceInput)
                            setBalanceInput(0)
                            setIsFetching(false)
                        }
                    })
            } else {
                setError('Minimal: 100, Maximal: 10000')
                setIsFetching(false)
            }
        }

        const handleCloseButtonClick = async (event) => {
            event.preventDefault()

        }

        const openButtonClick = async (event) => {
            event.preventDefault()
            setIsFetching(true)
            if (balanceInput > 100 && balanceInput < 10000) {
                await fetch("http://localhost:5000/api/account/", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': authToken
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 201) {
                            setBalance(0)
                            actionSetBalance(0)
                            setOpenButton(false)
                            setIsFetching(false)
                        }
                    })
            }
        }
        return <div className={styles.balance}>
            {openButton
                ? <button disabled={isFetching} onClick={openButtonClick}>Open bank</button>
                : <div className={styles.activeBank}>
                    <div className={styles.block}>
                        <span className={styles.title}>balance: </span><span>{balance}</span>
                    </div>
                    <div className={styles.addButton}>
                        <input className={styles.inputField} type="number" value={balanceInput} onChange={(e) => setBalanceInput(e.target.value)} />
                        <button
                            className={styles.submitButton}
                            disabled={isFetching}
                            onClick={handleAddBalanceButton}
                            type="submit">
                            add to balance
                                </button>
                        <button
                            className={styles.closeButton}
                            disabled={isFetching}
                            onClick={handleCloseButtonClick}
                            type="submit">
                            close bank
                                </button>
                        <div className={styles.error}>{error.length > 1 ? error : null}</div>
                    </div>
                </div>}
        </div>
    })