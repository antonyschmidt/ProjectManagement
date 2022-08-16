import { useState } from "react"
//context
import { useAuthContext } from '../hooks/useAuthContext'
//firebase
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword } from "firebase/auth"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            if (!res.user.uid) {
                throw new Error('Could not signup new user. Please try again')
            }

            dispatch({ type: 'SIGN_UP', payload: res.user })

            setIsPending(false)
        } catch (err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }

    }
    return { signup, error, isPending }
}