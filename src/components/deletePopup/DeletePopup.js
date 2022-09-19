import { useNavigate } from 'react-router'
//styles
import './DeletePopup.css'
//firestore
import { useFirestore } from '../../hooks/useFirestore';
import { useDeleteSecondary } from '../../hooks/useDeleteSecondary';

export default function DeletePopup({ setDeletePopupActive, id, c }) {
    const { response, deleteDocument } = useFirestore(c)
    const navigate = useNavigate()

    const handleClick = async () => {

        await deleteDocument(id)

        if (!response.error) {
            setDeletePopupActive(false)
            if (!c.includes('cards')) {
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
