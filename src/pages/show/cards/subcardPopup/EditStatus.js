//hooks
import { useFirestore } from '../../../../hooks/useFirestore'
import { useClickOutside } from '../../../../hooks/useClickOutside'
//styles
import './EditStatus.css'

export default function EditStatus({ status, setStatusEdit, project, subcard, setStatus, cId }) {
    const { updateDocument, response } = useFirestore('projects')
    const { domNode } = useClickOutside(() => {
        setStatusEdit(false)
    })

    const filteredCards = project.cards.filter((card) => {
        return card.cId !== cId
    })

    const handleClick = async (status, cId) => {

        if (cId !== subcard.pid) {

            let result = []

            project.subcards.map((subcard) => {
                result.push(subcard)
            })

            const SubCardIndex = result.findIndex((s) => s.id === subcard.id)

            result[SubCardIndex].status = status

            result[SubCardIndex].pid = cId

            await updateDocument(project.id, {
                subcards: [
                    ...result
                ]
            })

            setStatus(status)
            setStatusEdit(false)

        }

    }

    return (
        <div className="edit-status" ref={domNode}>
            <div className="status-cotainer" onClick={() => setStatusEdit(false)}>
                <p>{status}</p>
            </div>
            {filteredCards.map((card) => (
                <div className="status-cotainer">
                    <p onClick={() => handleClick(card.status, card.cId)}>{card.status}</p>
                </div>
            ))}
        </div >
    )
}
