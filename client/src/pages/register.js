import { useRouter } from 'next/router'
import { useState } from 'react'
import formStyles from '../styles/form.js'

export default function () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [error, setError] = useState(null)
    const router = useRouter()

    const loginUser = async (event) => {
        event.preventDefault();
        setError('')
        if (password !== verifyPassword) {
            setError('Passwords are not the same')
        }
        else {
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
                        router.push('/')
                    }
                })
        }
    }
    return (
        <main>
            <h1>Register Page</h1>
            <form>
                <label htmlFor="email">Email:</label>
                <input onChange={(e) => setEmail(e.currentTarget.value)} type="text" value={email} name="email" />
                <label htmlFor="password">Password:</label>
                <input onChange={(e) => setPassword(e.currentTarget.value)} type="password" value={password} name="password" />
                <label htmlFor="verifyPassword">Repeat password:</label>
                <input onChange={(e) => setVerifyPassword(e.currentTarget.value)} type="password" value={verifyPassword} name="verifyPassword" />
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