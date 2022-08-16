import { useState, useEffect } from 'react'
//firebase
import { db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

export const useDoc = (c, q) => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [data, setData] = useState(null)


    useEffect(() => {
        setError(null)
        setIsPending(true)

        const fetchDoc = async () => {
            try {
                const res = await getDoc(doc(db, c, q))

                if (!res) {
                    throw new Error('Could not load data')
                }

                console.log(res)

                setIsPending(false)
            } catch (err) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }

        fetchDoc()

    }, [db, c, q])



    return { data, error, isPending }
}