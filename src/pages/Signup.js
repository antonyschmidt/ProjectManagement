import { useState } from "react"
//hooks
import { useSignup } from "../hooks/useSignup";
import { useGoogle } from '../hooks/useGoogle'
//icons
import { FcGoogle } from "react-icons/fc";
//styles
import './Signup.css'
//icons
import { FaUserAlt } from "react-icons/fa";

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [inputErr, setInputErr] = useState(null)
    const { signup, error, isPending } = useSignup()
    const { googleSignUp } = useGoogle()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            return setInputErr('Fill out name and email first.')
        }

        await signup(email, password)

        setEmail('')
        setPassword('')
    }

    return (
        <div className='signup-content-container'>
            <div className="signup-container">
                <form onSubmit={handleSubmit} className='signup-form'>
                    <h1>Signup</h1>
                    <div className="signup-line-one" />
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
                    <button className="form-btn">Sign Up</button>
                    {inputErr && <p className="error">{inputErr}</p>}
                    {error && <p className="error">{error}</p>}
                    {isPending && <p className="isPending">Loading ...</p>}
                </form>
                <div className="or-break">
                    <div className="signup-line-two" />
                    <p>or</p>
                </div>
                <button className="google-btn" onClick={() => googleSignUp()}>
                    Sign Up with Google <FcGoogle className="google-icon" />
                </button>
            </div>
        </div>
    )
}
