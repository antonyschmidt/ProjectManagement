import { useEffect, useRef } from "react"

export const useClickOutside = (handler) => {
    let domNode = useRef()

    useEffect(() => {

        let maybeHandler = (e) => {

            if (domNode.current && !domNode.current.contains(e.target)) {
                handler(e)
            }

        }

        document.addEventListener('mousedown', maybeHandler)

        return () => {
            document.removeEventListener('mousedown', maybeHandler)
        }

    }, [domNode, handler])

    return { domNode }
}