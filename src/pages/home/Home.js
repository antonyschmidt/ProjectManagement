//styles
import './Home.css'

export default function Home() {

    return (
        <div className='home-container'>
            <div className='title-nav-section'>
                <h1>Project Manage App</h1>
                <ul className='home-nav-list'>
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
