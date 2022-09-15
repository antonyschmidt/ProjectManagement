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

const options = [
    { value: 'mark', label: 'mark' },
    { value: 'stefanie', label: 'stefanie' },
    { value: 'john', label: 'john' },
];

export default function AddProject({ setFormActive }) {
    const { addDocument, response } = useFirestore('projects')
    const [error, setError] = useState(null)
    const [title, setTitle] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [description, setDescription] = useState('')
    const [selectedOption, setSelectedOption] = useState([]);
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!title || !description || !dueDate || !selectedOption) {
            return setError('Please fill out all input fields')
        }

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
            setDueDate('')
            setDescription('')
            setSelectedOption(null)

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
                        <div className="add-project-form-left-container">
                            <label>
                                <span>Project Name</span>
                                <input
                                    className='project-name-input'
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                            </label>
                            <label>
                                <span>Description</span>
                                <textarea
                                    className='description-input'
                                    cols="20"
                                    rows="4"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                />
                            </label>
                        </div>
                        <div className="add-project-form-right-container">
                            <label>
                                <span>Due Date</span>
                                <input
                                    className='due-date-input'
                                    type="date"
                                    onChange={(e) => setDueDate(e.target.value)}
                                    value={dueDate}
                                />
                            </label>
                            <label >
                                <span>Assign Users</span>
                                <Select
                                    className='select-input'
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
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
