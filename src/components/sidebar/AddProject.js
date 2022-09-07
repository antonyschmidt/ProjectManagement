import { useState } from 'react'
import { useNavigate } from 'react-router'
//hooks
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
//styles
import './AddProject.css'
import { useEffect } from 'react'

export default function AddProject({ setFormActive }) {
    const { response, addDocument } = useFirestore('projects')
    const [title, setTitle] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [description, setDescription] = useState('')
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newProject = {
            title: title,
            createdBy: user.uid,
            description: description,
            dueDate: new Date(dueDate),
            assignedUsers: [],
        }


        await addDocument(newProject)
    }

    useEffect(() => {

        if (response.document) {
            setTitle('')
            setFormActive(false)
            navigate(`projects/${response.document.id}`)
        }

    }, [response])

    return (
        <div className='addProject-container'>
            <div className='click-container' onClick={() => setFormActive(false)} />
            <form className='addProject-form' onSubmit={handleSubmit}>
                <label>
                    <span>Project Name</span>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label>
                    <span>Due Date</span>
                    <input
                        className='dueDate-input'
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Description</span>
                    <textarea
                        cols="22"
                        rows="5"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </label>
                <button className='btn'>
                    Create Project
                </button>
                {response.error && <p className='error'>{response.error}</p>}
            </form>
        </div >
    )
}
