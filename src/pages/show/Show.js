import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
//components
import Card from './cards/Card'
//hooks
import { useDoc } from '../../hooks/useDoc'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useFirestore } from '../../hooks/useFirestore'
//icons
import { HiSortAscending } from "react-icons/hi";
import { AiOutlineCloudSync } from "react-icons/ai";
import { TbMessages } from "react-icons/tb";
//styles
import './Show.css'

export default function Show() {
    const { id } = useParams()
    const { data: project, error, isPending } = useDoc('projects', id)
    const [title, setTitle] = useState('')
    const { updateDocument, response } = useFirestore('projects')
    const { domNode } = useClickOutside(() => {
        handleSubmit()
    })

    useEffect(() => {

        if (project) {
            setTitle(project.title)
        }

    }, [project])

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault()
        }

        await updateDocument(id, {
            title: title
        })

    }

    return (
        <div className='show-container'>
            <div className='title-nav-section'>
                {project && <form onSubmit={handleSubmit}>
                    <input
                        maxLength='15'
                        ref={domNode}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        spellCheck='false'
                    />
                </form>}
                <ul className='show-nav-list'>
                    <div className='nav-links-container'>
                        <p className='active'>
                            Board
                        </p>
                        <p>
                            Details
                        </p>
                    </div>
                    <div className='show-nav-list-right'>
                        <div className="filter-box">
                            <HiSortAscending className='filter-icon' />
                            <p>Filter</p>
                        </div>
                        <div className='vertical-seperation-line' />
                        <div className="items-container">
                            <AiOutlineCloudSync className='cloud-icon' />
                            <TbMessages className='messages-icon' />
                        </div>
                    </div>
                </ul>
                <div className='break-line' />
            </div>
            <div className='main-show-section'>
                {project && <Card project={project} />}
                {error && <p className='error'>{error}</p>}
            </div>
        </div>
    )
}
