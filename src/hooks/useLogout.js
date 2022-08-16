import { useState } from 'react'
//firebase
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
//context
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try {
            const res = await signOut(auth)

            dispatch({ type: 'LOG_OUT' })

            setIsPending(false)
        } catch (err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }
    return { logout }

}