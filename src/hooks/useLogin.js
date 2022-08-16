import { useState } from "react"
//firebase
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from "firebase/auth"
//context
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await signInWithEmailAndPassword(auth, email, password)

            if (!res.user.uid) {
                throw new Error('Could not login new user. Please try again')
            }

            dispatch({ type: 'LOG_IN', payload: res.user })

            setIsPending(false)
        } catch (err) {
            console.log(err.message)
            setError('User not found. Try again.')
            setIsPending(false)
        }

    }
    return { login, error, isPending }
}