import { useState, useEffect } from 'react';
//firebase
import { db } from '../firebase/config'
import { collection, onSnapshot } from 'firebase/firestore';

export const useCollection = (c) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)


    useEffect(() => {
        try {
            setError(null)
            setIsPending(null)

            const unsub = onSnapshot(collection(db, c), (res) => {
                let results = []
                res.forEach((doc) => {
                    results.push(doc.data())
                })

                setData(results)
                setIsPending(false)
            })

        } catch (err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }

        return () => unsub()
    }, [c, db])



    return { data, error, isPending }
}