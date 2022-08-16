import { useParams } from 'react-router-dom'
//hooks
import { useDoc } from '../hooks/useDoc'
//styles
import './Show.css'

export default function Show() {
    const { userId } = useParams()
    const { data, error, isPending } = useDoc('projects', {
        'title': userId
    })

    console.log(userId)

    return (
        <div className='show-container'>
            <div className='title-nav-section'>
                <h1>Project Manage App</h1>
                <ul className='show-nav-list'>
                    <li>
                        Board
                    </li>
                    <li>
                        Gantt
                    </li>
                    <li>
                        Activities
                    </li>
                    <li>
                        Details
                    </li>
                </ul>
                <div className='break-line' />
            </div>
            <div className='main-section'>
                <div className='card-container'>

                </div>
            </div>
        </div>
    )
}
