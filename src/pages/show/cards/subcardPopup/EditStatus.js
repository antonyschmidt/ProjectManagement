//hooks
import { useFirestore } from '../../../../hooks/useFirestore'
import { useClickOutside } from '../../../../hooks/useClickOutside'
//styles
import './EditStatus.css'

export default function EditStatus({ status, setStatusEdit, project, subcard, setStatus, currentCId, currentCard, setCurrentCId, setCurrentCard }) {
    const { updateDocument, response } = useFirestore('projects')
    const { domNode } = useClickOutside(() => {
        setStatusEdit(false)
    })

    const filteredCards = project.cards.filter((card) => {
        return card.cId !== currentCId
    })

    const handleClick = async (card) => {

        let result = []

        project.subcards.map((subcard) => {
            result.push(subcard)
        })

        const SubCardIndex = result.findIndex((s) => s.id === subcard.id)

        result[SubCardIndex].status = card.status

        result[SubCardIndex].pid = card.cId

        await updateDocument(project.id, {
            subcards: [
                ...result
            ]
        })

        setCurrentCard(card)
        setCurrentCId(card.cId)
        setStatus(card.status)
        setStatusEdit(false)



    }

    return (
        <div className="edit-status" ref={domNode}>
            <div className="status-cotainer" onClick={() => setStatusEdit(false)}>
                <p style={{ backgroundColor: currentCard.color }}>{status}</p>
            </div>
            {filteredCards.map((card) => (
                <div className="status-cotainer" key={card.id}>
                    <p style={{ backgroundColor: card.color }} onClick={() => handleClick(card)}>{card.status}</p>
                </div>
            ))}
        </div >
    )
}
