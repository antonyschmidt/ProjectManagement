import { useState } from "react"
//firebase
import { db } from '../firebase/config'
import { collection, addDoc } from "firebase/firestore"

export const useAddProject = (c) => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const addProject = async (title, uid) => {
        setError(null)
        setIsPending(true)

        try {

            const res = await addDoc(collection(db, c), { title, uid })

            if (!res) {
                throw new Error('Could not create new Project')
            }

            setIsPending(false)
        } catch (err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }

    }
    return { addProject, error, isPending }
}