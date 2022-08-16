//styles
import './Topbar.css'
//assets
import profileOne from '../assets/woman.jpg'
import profileTwo from '../assets/woman2.jpg'
import profileThree from '../assets/woman3.jpg'
//icons
import { FaSearch } from "react-icons/fa";
//hooks
import { useLogout } from '../hooks/useLogout';

export default function Topbar() {
    const { logout, error, isPending } = useLogout()

    return (
        <nav className='topbar'>
            <div className='searchbar'>
                <i><FaSearch /></i>
                <input type="text" placeholder='Search' className='topbar-searchbar' />
            </div>
            <div className="friends-section">
                <ul>
                    <li className='profile-image-one'>
                        <img src={profileOne} alt="" />
                    </li>
                    <li className='profile-image-two'>
                        <img src={profileTwo} alt="" />
                    </li>
                    <li className='profile-image-three'>
                        <img src={profileThree} alt="" />
                    </li>
                </ul>
                <button className='btn'>
                    +
                </button>
            </div>
            <button className='btn' onClick={() => logout()}>
                Logout
            </button>
        </nav >
    )
}
