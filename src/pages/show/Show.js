import { useParams } from 'react-router-dom'
//components
import Card from './cards/Card'
//hooks
import { useDoc } from '../../hooks/useDoc'
//styles
import './Show.css'

export default function Show() {
    const { id } = useParams()
    const { data: project, error, isPending } = useDoc('projects', id)

    return (
        <div className='show-container'>
            <div className='title-nav-section'>
                {project && <h1>{project.title}</h1>}
                <ul className='show-nav-list'>
                    <p>
                        Board
                    </p>
                    <p>
                        Gantt
                    </p>
                    <p>
                        Activities
                    </p>
                    <p>
                        Details
                    </p>
                </ul>
                <div className='break-line' />
            </div>
            <div className='main-show-section'>
                {project && <Card id={id} project={project} />}
                {error && <p className='error'>{error}</p>}
            </div>
        </div>
    )
}
