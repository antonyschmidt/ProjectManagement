import { useState } from 'react'
//firebase
import { auth, provider } from '../firebase/config'
import { signInWithPopup } from 'firebase/auth'
//context
import { useAuthContext } from './useAuthContext'

export const useGoogle = () => {
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const googleSignUp = async () => {
        setError(null)

        try {

            const res = await signInWithPopup(auth, provider)

            if (!res) {
                throw new Error('Failed to sign in!')
            }

            dispatch({ type: 'SIGN_UP', payload: res.user })

        } catch (err) {
            console.log(err.message)
            setError(err.message)
        }

    }
    return { googleSignUp }
}