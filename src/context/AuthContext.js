import { useEffect } from "react";
import { createContext, useReducer } from "react";
// firebase
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext()

function authReducer(state, action) {
    switch (action.type) {
        case 'AUTH_READY':
            return { ...state, authReady: true, user: action.payload }
        case 'SIGN_UP':
            return { ...state, user: action.payload }
        case 'LOG_IN':
            return { ...state, user: action.payload }
        case 'LOG_OUT':
            return { ...state, user: null }
        default:
            return state
    }
}

export function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authReady: false
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            dispatch({ type: 'AUTH_READY', payload: user })
            console.log('Auth Is ready', user)
        })
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
