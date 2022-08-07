import { Link } from 'react-router-dom'
//icons
import { FaDiceD6 } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
//styles
import './Sidebar.css'

export default function Sidebar() {

    return (
        <nav className='sidebar'>
            <div className='title-container'>
                <div className='close-icon'><FaAngleLeft /></div>
                <h2 className='title'>Raum</h2><FaDiceD6 className='logo' />
            </div>
            <div className='searchbar'>
                <input type="text" placeholder='Search' className='sidebar-searchbar' />
            </div>
            <ul className='nav-list'>
                <li>
                    <Link to='/'>
                        <MdSpaceDashboard className='dashboard-icon' />
                        <p>Dashboard</p>
                    </Link>
                </li>
                <li>
                    <Link to='/show'>
                        <FaFolder className='projects-icon' />
                        <p>Projects</p>
                    </Link>
                </li>
                <li>
                    <Link to='/signup'>
                        <FaUserAlt className='signup-icon' />
                        <p>Signup</p>
                    </Link>
                </li>
                <li>
                    <Link to='/login'>
                        <FaUserCheck className='login-icon' />
                        <p>Login</p>
                    </Link>
                </li>
                <button className='btn'>
                    Logout
                </button>
            </ul>
        </nav>
    )
}
