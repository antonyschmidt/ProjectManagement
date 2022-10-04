import { useState } from 'react'
import { useNavigate } from 'react-router'
//services
import Select from 'react-select';
//hooks
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
//styles
import './AddProject.css'
import { useEffect } from 'react'

export default function AddProject({ setFormActive }) {
    const { addDocument, response } = useFirestore('projects')
    const [error, setError] = useState(null)
    const [title, setTitle] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [description, setDescription] = useState('')
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!title || !description || !dueDate) {
            return setError('Please fill out all input fields')
        }

        const current = new Date(dueDate)
        const date = `${current.getDate()}.${current.getMonth() + 1}.${current.getFullYear()}`

        const newProject = {
            title: title,
            createdBy: user.uid,
            description: description,
            dueDate: date,
            assignedUsers: [],
            cards: [],
            subcards: []
        }


        await addDocument(newProject)

    }

    useEffect(() => {

        if (response.document) {

            setTitle('')
            setDueDate('')
            setDescription('')

            setFormActive(false)
            navigate(`projects/${response.document.id}`)
        }

    }, [response])

    return (
        <div className='add-project-container'>
            <div className='click-container' onClick={() => setFormActive(false)} />
            <div className='add-project-form-container'>
                <h3>Create new project</h3>
                <form className='add-project-form' onSubmit={handleSubmit}>
                    <div className="input-container">
                        <div className="add-project-form-top-container">
                            <label>
                                <span>Project Name</span>
                                <input
                                    maxLength='15'
                                    className='project-name-input'
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                            </label>
                            <label>
                                <span>Due Date</span>
                                <input
                                    className='due-date-input'
                                    type="date"
                                    onChange={(e) => setDueDate(e.target.value)}
                                    value={dueDate}
                                />
                            </label>
                        </div>
                        <div className="add-project-form-bottom-container">
                            <label>
                                <span>Description</span>
                                <textarea
                                    style={{ resize: 'none' }}
                                    className='description-input'
                                    cols='51'
                                    rows="6"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="seperation-line" />
                    <div className="add-project-btn-container">
                        <button className='btn'>
                            Submit
                        </button>
                    </div>
                    {error && <p className='error'>{error}</p>}
                    {response.error && <p className='error'>{response.error}</p>}
                </form>
            </div>

        </div >
    )
}
