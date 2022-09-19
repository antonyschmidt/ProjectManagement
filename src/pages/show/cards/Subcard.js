import { MdDateRange } from "react-icons/md";
import { BiComment } from "react-icons/bi";
//assets
import profileOne from '../../../assets/woman.jpg'
import profileTwo from '../../../assets/woman2.jpg'
import { useEffect } from "react";
import { useState } from "react";
// hooks
import { useCollection } from '../../../hooks/useCollection'

export default function Subcard({ parentId, project }) {
    const [statusQuery, setStatusQuery] = useState(null)
    const { data: subcards, error, isPending } = useCollection(
        `projects/${project.id}/subcards`,
        statusQuery
    )

    useEffect(() => {

        const q = ['parentCardId', '==', parentId]

        setStatusQuery(q)
    }, [parentId])

    return (
        <>
            {subcards && subcards.map((subcard) => (
                <div className="subcard" key={subcard.id}>
                    <div className="subcard-top">
                        <h4>{subcard.title}</h4>
                        <div className="subcard-top-bottom-section">
                            <div className="rating-container">
                                <p className='subcard-rating-display'>{subcard.rating}</p>
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
                            <p>{subcard.createdAt}</p>
                        </div>
                        <div className="comment-container">
                            <BiComment className="comment-icon" />
                            <p>2</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
