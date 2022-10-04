import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//hooks
import { useCollection } from "../../hooks/useCollection";
//icons
import { FaDiceD6 } from "react-icons/fa";
import { GiSleepingBag } from "react-icons/gi";
import { MdDateRange } from "react-icons/md";
//styles
import './Home.css'




export default function Home() {
    const { data, error, isPending } = useCollection('projects')
    const [projects, setProjects] = useState(null)
    const navigate = useNavigate()

    const handleClick = (id) => {

        navigate(`projects/${id}`)

    }

    useEffect(() => {

        if (data) {
            if (data.length > 0) {
                setProjects(data)
            }
        }

    }, [data])

    return (
        <div className='home-container'>
            <div className="home-top-section">
                <div className="home-header">
                    <h1>Raum</h1>
                    <FaDiceD6 />
                </div>
                <p>Your personal project manager</p>
            </div>
            <div className="seperation-line" />
            <div className="home-bottom-section">
                {projects && <h3>All Projects</h3>}
                {!projects && <div className="no-projects-container">
                    <GiSleepingBag />
                    <p className="no-projects">No projects yet ...</p>
                </div>}
                <ul className="home-project-list">
                    {projects && projects.map((project) => (
                        <li key={project.id} onClick={() => handleClick(project.id)}>
                            <h4>{project.title}</h4>
                            <p>{project.description.length > 80 ? `${project.description.substring(0, 80)}...` : project.description}</p>
                            <p><MdDateRange className="home-date-icon" />{project.dueDate}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
