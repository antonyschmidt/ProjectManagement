import { useState } from "react";
import { NavLink } from 'react-router-dom'
//icons
import { FaFolderMinus } from "react-icons/fa";
import { useEffect } from "react";

export default function ProjectLink({ projects, setProjectId, setDeletePopupActive }) {
    const [freshProjects, setFreshProjects] = useState(null)


    useEffect(() => {

        setFreshProjects(projects)

    }, [projects])

    const handleClick = async (project) => {
        setProjectId(project)
        setDeletePopupActive(true)
    }

    return (
        <>
            {freshProjects && freshProjects.map((project) => (
                <li key={project.id}>
                    <NavLink to={`/projects/${project.id}`}>
                        {project.title}
                        <FaFolderMinus className='folder-minus-icon' onClick={() => handleClick(project)} />
                    </NavLink>
                </li>
            ))}
        </>
    )
}
