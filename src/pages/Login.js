import { useState } from "react"
//hooks
import { useLogin } from "../hooks/useLogin"
import { useGoogle } from '../hooks/useGoogle'
//icons
import { FcGoogle } from "react-icons/fc";
//styles
import './Login.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [inputErr, setInputErr] = useState(null)
    const { login, error, isPending } = useLogin()
    const { googleSignUp } = useGoogle()


    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email || !password) {
            return setInputErr('Fill out name and email first.')
        }

        login(email, password)

        setEmail('')
        setPassword('')
    }

    return (
        <div className="login-content-container">
            <div className="login-container">
                <form onSubmit={handleSubmit} className='login-form'>
                    <h1>Login</h1>
                    <div className="login-line-one" />
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
                    <button className="form-btn" >Login</button>
                    {inputErr && <p className="error">{inputErr}</p>}
                    {error && <p className="error">{error}</p>}
                    {isPending && <p className="isPending">Loading ...</p>}
                </form>
                <div className="or-break">
                    <div className="login-line-two" />
                    <p>or</p>
                </div>
                <button className="google-btn" onClick={() => googleSignUp()}>
                    Log In with Google <FcGoogle className="google-icon" />
                </button>
            </div>
        </div>
    )
}