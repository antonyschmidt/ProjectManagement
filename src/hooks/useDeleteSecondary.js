import { useState } from "react"
//firebase
import { db } from '../firebase/config'
import { query, getDocs, collection, where, deleteDoc } from 'firebase/firestore'
import { useEffect } from "react"

export const useDeleteSecondary = (secondaryCollection) => {
    const [error, setError] = useState(null)
    const [isCancelled, setIsCancelled] = useState(false)

    const deleteSecondary = async (id) => {

        try {
            const q = query(collection(db, secondaryCollection), where('pid', '==', id))

            const querySnapshot = await getDocs(q)

            await querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref)
            })


        } catch (err) {
            if (!isCancelled) {
                setError(err.message)
            }
        }

    }


    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { deleteSecondary, error }

}