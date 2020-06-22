import { useRouter } from 'next/router'
import { useState } from 'react'
import { connect } from 'react-redux'
import { setToken } from '../store/actions/auth'
import formStyles from '../styles/form.js'

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const router = useRouter()

    const loginUser = async (event) => {
        event.preventDefault();
        setError('')
        await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 400 || res.status === 401) {
                    setError(res.message)
                } else if (res.status === 200) {
                    localStorage.setItem('jwt', res.token);
                    setToken(res.token)
                    router.push('/')
                }
            })
    }
    return (
        <main>
            <h1>Login Page</h1>
            <form>
                <label htmlFor="email">Email:</label>
                <input onChange={(e) => setEmail(e.currentTarget.value)} type="text" value={email} name="email" />
                <label htmlFor="password">Password:</label>
                <input onChange={(e) => setPassword(e.currentTarget.value)} type="password" value={password} name="password" />
                {error ? <h5>{error}</h5> : null}
                <div className="buttons">
                    <button onClick={loginUser}>Login</button>
                </div>
            </form>
            <style jsx>
                {formStyles}
            </style>
        </main>

    )
}

export default connect(null, { setToken })(Login)