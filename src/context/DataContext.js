import { useEffect } from "react";
import { createContext, useReducer } from "react";

export const DataContext = createContext()

function authReducer(state, action) {
    switch (action.type) {
        case 'ADD_DATA':
        case 'DELETE_DATA':
        case 'UPDATE_DATA':
            return { ...state, data: action.payload }
        default:
            return state
    }
}

export function DataContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {
        data: null
    })

    return (
        <DataContext.Provider value={{ ...state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}
