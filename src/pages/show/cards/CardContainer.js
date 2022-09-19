import { useState } from 'react'
//react icons
import { BiMessageSquareAdd } from "react-icons/bi";
//hooks
import { useCollection } from '../../../hooks/useCollection';
import { useFirestore } from "../../../hooks/useFirestore";
//components
import Card from './Card'
//firebase
import { timestamp } from '../../../firebase/config';
//styles
import './CardContainer.css'
import { useEffect } from 'react';


export default function CardContainer({ project }) {
    const { response, addDocument } = useFirestore(`projects/${project.id}/cards`)
    // const [query, setQuery] = useState(null)
    const { data: cards, error } = useCollection(
        `projects/${project.id}/cards`
    )

    // useEffect(() => {

    //     const q = ['pid', '==', project.id]

    //     setQuery(q)
    // }, [project])


    const newCard = {
        status: 'untitled',
        timestamp: timestamp
    }


    const handleClick = async () => {

        if (cards.length < 8) {
            await addDocument(newCard)
        }
    }

    return (
        <div className='card-container'>
            {cards && <Card project={project} cards={cards} />}
            <div className="add-card-container" onClick={handleClick}>
                <BiMessageSquareAdd className="add-card-icon" />
            </div>
            {error && <p className='error'>{error}</p>}
            {response.error && <p className='error'>{response.error}</p>}
        </div>
    )
}
