import { useNavigate } from 'react-router'
//styles
import './DeletePopup.css'
//firestore
import { useFirestore } from '../../hooks/useFirestore';

export default function DeletePopup({ setDeletePopupActive, setSubcardFormActive, subId, cId, id, project }) {
    const { response, deleteDocument, updateDocument } = useFirestore('projects')
    const navigate = useNavigate()

    const handleClick = async () => {

        if (id) {
            await deleteDocument(id.id)
        }

        if (subId) {
            const filteredSubcards = project.subcards.filter((subcard) => {
                return subcard.id !== subId
            })

            await updateDocument(project.id, {
                subcards: [
                    ...filteredSubcards
                ]
            })

            setDeletePopupActive(false)
            setSubcardFormActive(false)
        }


        if (cId) {

            const filteredSubcards = project.subcards.filter((subcard) => {
                return subcard.pid !== cId
            })

            let result = []

            project.cards.map((card) => {
                result.push(card)
            })

            const cardIndex = result.findIndex((c) => c.cId == cId)

            result.splice(cardIndex, 1)

            await updateDocument(project.id, {
                subcards: [
                    ...filteredSubcards
                ]
            })

            await updateDocument(project.id, {
                cards: [
                    ...result
                ]
            })

        }

        if (!response.error) {
            setDeletePopupActive(false)
            if (!cId && id) {
                navigate('/')
            }
        }
    }

    return (
        <div className='delete-popup-container'>
            <div className='click-container' onClick={() => setDeletePopupActive(false)} />
            <div className='popup'>
                <p>Are you sure you want to delete this?</p>
                <p>This action cant be undone!</p>
                <div className='btn-container'>
                    <button className="danger-btn" onClick={handleClick}>Delete</button>
                    <button className="btn" onClick={() => setDeletePopupActive(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
