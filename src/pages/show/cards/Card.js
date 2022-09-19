//hooks
import { useFirestore } from '../../../hooks/useFirestore'
//firebase
import { query } from 'firebase/firestore'
//components
import Subcard from './Subcard';
import CardHeader from './CardHeader'
//styles
import './CardContainer.css'

export default function Card({ cards, project }) {
    const { response, addDocument } = useFirestore(`projects/${project.id}/subcards`)


    const addSubcardClick = async (status, parentId) => {

        const current = new Date()
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`

        await addDocument({
            title: 'untitled',
            description: '',
            comments: [],
            assignedUsers: [],
            rating: 'low',
            status: status,
            parentCardId: parentId,
            createdAt: date
        })

    }

    return (
        <>
            {cards.map((card) => (
                <div key={card.id} className="card">
                    <CardHeader card={card} project={project} />
                    <div className="subcards-container">
                        <Subcard parentId={card.id} project={project} />
                    </div>
                    <button className='subcard-btn' onClick={() => addSubcardClick(card.status, card.id)}>
                        + Add Card
                    </button>
                </div>
            ))}
        </>
    )
}
