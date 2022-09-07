import { useNavigate } from 'react-router'
//styles
import './DeletePopup.css'
//firestore
import { useFirestore } from '../../hooks/useFirestore';

export default function DeletePopup({ setDeletePopupActive, projectId }) {
    const { response, deleteDocument } = useFirestore('projects')
    const navigate = useNavigate()

    const handleClick = async () => {

        await deleteDocument(projectId)

        if (!response.error) {
            setDeletePopupActive(false)
            navigate('/')
        }
    }

    return (
        <div className='delete-popup-container'>
            <div className='click-container' onClick={() => setDeletePopupActive(false)} />
            <div className='popup'>
                <p>Are you sure you want to delete this project?</p>
                <p>This action cant be undone!</p>
                <div className='btn-container'>
                    <button className="danger-btn" onClick={handleClick}>Delete</button>
                    <button className="btn" onClick={() => setDeletePopupActive(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
