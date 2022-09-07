import { useState, useEffect } from 'react'
//firebase
import { db } from '../firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'

export const useDoc = (c, id) => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [data, setData] = useState(null)


    useEffect(() => {
        setError(null)
        setIsPending(true)


        try {
            const unsub = onSnapshot(doc(db, c, id), (doc) => {

                if (!doc.data()) {
                    return setError('Could not fetch data!')
                }

                setData({ ...doc.data(), id: doc.id })
                setIsPending(false)
            })

            return () => unsub()

        } catch (err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }




    }, [c, id])



    return { data, error, isPending }
}