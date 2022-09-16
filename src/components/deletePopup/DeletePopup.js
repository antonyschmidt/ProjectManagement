import { useNavigate } from 'react-router'
//styles
import './DeletePopup.css'
//firestore
import { useFirestore } from '../../hooks/useFirestore';
import { useDeleteSecondary } from '../../hooks/useDeleteSecondary';

export default function DeletePopup({ setDeletePopupActive, id, c, secondaryCollection }) {
    const { response, deleteDocument } = useFirestore(c)
    const { deleteSecondary, error } = useDeleteSecondary(secondaryCollection)
    const navigate = useNavigate()

    const handleClick = async () => {

        await deleteSecondary(id)

        if (!error) {
            await deleteDocument(id)
        }


        if (!response.error && !error) {
            setDeletePopupActive(false)
            if (c != 'cards') {
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
                    {error && <p className='error'>{error}</p>}
                </div>
            </div>
        </div>
    )
}
