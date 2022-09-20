import { useState, useEffect } from 'react';
//firebase
import { db } from '../firebase/config'
import { query, collection, onSnapshot, where } from 'firebase/firestore';


export const useCollection = (c, q) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)



    useEffect(() => {

        let ref = collection(db, c)

        if (q) {
            ref = query(collection(db, c), where(...q))
        }


        try {
            setError(null)
            setIsPending(null)

            const unsub = onSnapshot(ref, (res) => {
                let results = []
                res.forEach((doc) => {
                    results.push({ ...doc.data(), id: doc.id })
                })
                setData(results)
                setIsPending(false)
            })

            return () => unsub()

        } catch (err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }


    }, [c, q])

    return { data, error, isPending }
}