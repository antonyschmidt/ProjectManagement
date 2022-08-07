import { useState } from "react"
//hooks
import { useSignup } from "../hooks/useSignup";
//styles
import './Signup.css'
//icons
import { FaUserAlt } from "react-icons/fa";

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isPending } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)

        setEmail('')
        setPassword('')
    }

    return (
        <div className='signup-container'>
            <form onSubmit={handleSubmit} className='signup-form'>
                <h1>Signup</h1>
                <div className="signup-line" />
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
                <button className="btn">Sign Up</button>
                {error && <p className="error">{error}</p>}
                {isPending && <p className="isPending">Loading ...</p>}
            </form>
        </div>
    )
}
