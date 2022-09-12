import { Link } from 'react-router-dom'
//icons
import { FaDiceD6 } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
//components
import AddProject from './AddProject';
import DeletePopup from '../deletePopup/DeletePopup';
import ProjectLink from './ProjectLink';
//hooks
import { useCollection } from '../../hooks/useCollection';
//context
import { useAuthContext } from '../../hooks/useAuthContext'
//styles
import './Sidebar.css'
import { useState } from 'react';


export default function Sidebar() {
    const { data, error, isPending } = useCollection('projects')
    const [formActive, setFormActive] = useState(false)
    const [deletePopupActive, setDeletePopupActive] = useState(false)
    const [sidebarActive, setSidebarActive] = useState(true)
    const [projectId, setProjectId] = useState('')
    const { user } = useAuthContext()

    let userRef = ''

    if (user) {
        userRef = user.email.charAt(0)
    }

    return (
        <>
            <div className={!sidebarActive ? 'sidebar-toggle-open' : 'sidebar-toggle-closed'}>
                <FaAngleRight className='open-icon' onClick={() => setSidebarActive(true)} />
            </div>
            <nav className={sidebarActive ? 'sidebar-container' : 'sidebar-container-inactive'}>
                <FaAngleLeft className='close-icon' onClick={() => setSidebarActive(false)} />
                {!user &&
                    <div className='title-container'>

                        <h2 className='title'>Raum</h2><FaDiceD6 className='logo' />
                    </div>}

                {user && <div className='user-widget-container'>
                    <div className='letterbox'>
                        <p>{userRef}</p>
                    </div>
                    <p>{user.email}</p>
                </div>}

                {user &&
                    <div className='overview-heading'>
                        <p>Overview</p>
                    </div>}
                <ul className='nav-list'>
                    {user &&
                        <li>
                            <Link to='/'>
                                <MdSpaceDashboard className='dashboard-icon' />
                                <p>Dashboard</p>
                            </Link>
                        </li>}
                    {user &&
                        <li>
                            <Link to='/show'>
                                <FaFolder className='projects-icon' />
                                <p>Projects</p>
                            </Link>
                        </li>}
                    {!user &&
                        <li>
                            <Link to='/signup'>
                                <FaUserAlt className='signup-icon' />
                                <p>Signup</p>
                            </Link>
                        </li>}
                    {!user &&
                        <li>
                            <Link to='/login'>
                                <FaUserCheck className='login-icon' />
                                <p>Login</p>
                            </Link>
                        </li>}
                </ul>
                {user &&
                    <>
                        <div className='seperation-line' />
                        <div className='workspace-nav'>
                            <p>Workspace</p>
                            <i className='add-icon' onClick={() => setFormActive(true)}>+</i>
                        </div>
                        <ul className='workspace-list'>
                            {data && <ProjectLink setDeletePopupActive={setDeletePopupActive} setProjectId={setProjectId} projects={data} />}
                        </ul>
                    </>
                }
                <div className="sidebar-circles-container">
                    <div className="sidebar-circles">
                        <div className='sidebar-circle-primary-bottom' />
                        <div className='sidebar-circle-secondary-bottom' />
                    </div>
                </div>

            </nav>
            {formActive && <AddProject setFormActive={setFormActive} />}
            {deletePopupActive && projectId && <DeletePopup id={projectId} setDeletePopupActive={setDeletePopupActive} c={'projects'} />}
        </>
    )
}

