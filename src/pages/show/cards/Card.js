import { useState } from 'react'
//react icons
import { BiMessageSquareAdd } from "react-icons/bi";
import { CgMoreO } from "react-icons/cg";
//hooks
import { useCollection } from '../../../hooks/useCollection';
import { useFirestore } from "../../../hooks/useFirestore";
//components
import Subcard from './Subcard';
//firebase
import { timestamp } from '../../../firebase/config';
//styles
import './Card.css'
import { useEffect } from 'react';


export default function Card({ id, project }) {
    const { response, addDocument, updateDocument } = useFirestore('cards')
    const [query, setQuery] = useState(null)
    const { data: cards, error } = useCollection(
        'cards',
        query
    )


    useEffect(() => {

        const q = ['pid', '==', project.id]

        setQuery(q)
    }, [project])


    const newCard = {
        status: 'untitled',
        timestamp: timestamp,
        pid: project.id,
        subcards: []
    }


    const handleClick = async () => {

        if (cards.length < 7) {
            await addDocument(newCard)
        }
    }


    const addCardClick = async (id, subcards) => {

        await updateDocument(id, {
            subcards: [
                ...subcards, {
                    title: 'untitled',
                    description: '',
                    assignedUsers: [],
                    rating: 'low',
                    id: Math.random() * 1000
                }
            ]
        })

    }

    return (
        <div className='card-container'>
            {cards && cards.map((card) => (
                <div key={card.id} className="card">
                    <div className="header-container">
                        <h3>{card.status}</h3>
                        <CgMoreO className="more-subcard-icon" />
                    </div>
                    <div className='seperation-line-card' />
                    <div className="subcards-container">
                        {card.subcards.map((subcards) => (
                            <Subcard key={subcards.id} subcards={subcards} />
                        ))}
                    </div>
                    <button className='subcard-btn' onClick={() => addCardClick(card.id, card.subcards)}>
                        + Add Card
                    </button>
                </div>
            ))}
            <div className="add-card-container" onClick={handleClick}>
                <BiMessageSquareAdd className="add-card-icon" />
            </div>
            {error && <p className='error'>{error}</p>}
            {response.error && <p className='error'>{response.error}</p>}
        </div>
    )
}
