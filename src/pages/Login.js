import { useState } from "react"
//styles
import './Login.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        setEmail('')
        setPassword('')
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className='login-form'>
                <h1>Login</h1>
                <div className="login-line" />
                <label>
                    <p>Enter Email:</p>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    <p>Enter Password:</p>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                <button className="btn">Login</button>
            </form>
        </div>
    )
}