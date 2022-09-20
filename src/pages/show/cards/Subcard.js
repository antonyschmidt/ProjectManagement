import { MdDateRange } from "react-icons/md";
import { BiComment } from "react-icons/bi";
//assets
import profileOne from '../../../assets/woman.jpg'
import profileTwo from '../../../assets/woman2.jpg'

export default function Subcard({ subcards }) {

    return (
        <div className="subcard">
            <div className="subcard-top">
                <h4>{subcards.title}</h4>
                <div className="subcard-top-bottom-section">
                    <div className="rating-container">
                        <p className='subcard-rating-display'>{subcards.rating}</p>
                    </div>
                    <div className="assigned-users">
                        <ul>
                            <li>
                                <img src={profileOne} alt="" className='assigned-user-one' />
                            </li>
                            <li>
                                <img src={profileTwo} alt="" className='assigned-user-two' />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="seperation-line-card" />
            <div className="subcard-bottom">
                <div className="subcard-date-container">
                    <MdDateRange className="date-icon" />
                    <p>{subcards.createdAt}</p>
                </div>
                <div className="comment-container">
                    <BiComment className="comment-icon" />
                    <p>2</p>
                </div>
            </div>
        </div>
    )
}
