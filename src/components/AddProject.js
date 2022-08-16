import { useState } from 'react'
//hooks
import { useAddProject } from '../hooks/useAddProject'
import { useAuthContext } from '../hooks/useAuthContext'
//styles
import './AddProject.css'

export default function addProject({ setFormActive }) {
    const { addProject, error, isPending } = useAddProject('projects')
    const [title, setTitle] = useState('')
    const { user } = useAuthContext()

    const handleSubmit = (e) => {
        e.preventDefault()

        addProject(title, user.uid)

        setTitle('')
        setFormActive(false)
    }

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
                <button className='btn'>
                    Create Project
                </button>
            </form>
        </div >
    )
}
