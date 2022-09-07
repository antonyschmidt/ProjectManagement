import { useState, useReducer } from "react"
//firebase
import { db } from '../firebase/config'
import { collection, addDoc, doc, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore"
import { useEffect } from "react"


let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null }
        case 'UPDATED_DOCUMENT':
            return { isPending: false, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const useFirestore = (c) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)


    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }

    }

    const addDocument = async (doc) => {

        try {

            const addedDocument = await addDoc(collection(db, c), { ...doc })


            if (!addedDocument) {
                throw new Error('Could not create new Project')
            }

            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not add document' })
        }

    }

    const updateDocument = async (id, update) => {
        dispatch({ type: 'IS_PENDING' })

        console.log(update)

        try {

            await updateDoc(doc(db, c, id), update)


            dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT' })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
            console.log(err.message)
        }
    }

    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' })

        try {

            await deleteDoc(doc(db, c, id));

            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
        } catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not add document' })
        }
    }

    useEffect(() => {

        return () => setIsCancelled(true)

    }, [])

    return { addDocument, updateDocument, deleteDocument, response }

}



