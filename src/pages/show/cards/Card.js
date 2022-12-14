import { useState } from "react";
//react icons
import { BiMessageSquareAdd } from "react-icons/bi";
//hooks
import { useFirestore } from "../../../hooks/useFirestore";
//components
import Subcard from './Subcard';
import CardHeader from './CardHeader'
//styles
import './Card.css'


export default function Card({ project }) {
    const { response, updateDocument } = useFirestore('projects')
    const current = new Date()
    const date = `${current.getDate()}.${current.getMonth() + 1}.${current.getFullYear()}`

    const newCard = {
        status: 'untitled',
        color: '#cfc7c2',
        createdAt: date,
        cId: Math.random() * 1000
    }

    const handleClick = async () => {

        let cards = []

        if (project.cards) {
            cards = project.cards
        }

        await updateDocument(project.id, {

            cards: [
                ...cards,
                newCard
            ]
        })

    }


    const addSubcardClick = async (cId, status) => {


        let subcards = []

        if (project.subcards) {
            subcards = project.subcards
        }

        await updateDocument(project.id, {

            subcards: [
                ...subcards, {
                    title: 'untitled',
                    description: '',
                    assignedUsers: [],
                    rating: 'low',
                    status: status,
                    category: 'none',
                    createdAt: date,
                    pid: cId,
                    id: Math.random() * 1000
                }
            ]
        })

    }

    return (
        <div className='card-container'>
            {project.cards && project.cards.map((card) => (
                <div key={card.cId} className="card">
                    <CardHeader cId={card.cId} subcards={project.subcards} card={card} project={project} />
                    <Subcard cId={card.cId} subcards={project.subcards} project={project} />
                    <button className='subcard-btn' onClick={() => addSubcardClick(card.cId, card.status)}>
                        + Add Card
                    </button>
                </div>
            ))}
            <div className="add-card-container" onClick={handleClick}>
                <BiMessageSquareAdd className="add-card-icon" />
            </div>
            {response.error && <p className='error'>{response.error}</p>}
        </div >
    )
}
