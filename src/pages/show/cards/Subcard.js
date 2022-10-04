import { useState } from "react";
//components
import SubcardForm from "./subcardPopup/SubcardForm";
import DeletePopup from "../../../components/deletePopup/DeletePopup";
//icons
import { MdDateRange } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
//assets
import profileOne from '../../../assets/woman.jpg'
import profileTwo from '../../../assets/woman2.jpg'

export default function Subcard({ cId, subcards, project }) {
    const [subcard, setSubcard] = useState(null)
    const [subId, setSubId] = useState(null)
    const [deletePopupActive, setDeletePopupActive] = useState(false)
    const [subcardFormActive, setSubcardFormActive] = useState(false)

    const filteredSubcards = subcards.filter((subcard) => {

        return subcard.pid === cId
    })

    const handleClick = (sbcd) => {

        setSubcard(sbcd)
        setSubcardFormActive(true)
    }

    const handleDelete = (id) => {

        setSubId(id)
        setDeletePopupActive(true)
    }

    const chooseColor = (i) => {
        switch (i) {
            case 'low':
                return 'priority-pill-low-subcard';
            case 'mid':
                return 'priority-pill-mid-subcard';
            case 'high':
                return 'priority-pill-high-subcard';
        }
    }

    return (
        <>
            {filteredSubcards.length > 0 &&
                <div className="subcards-container">
                    {filteredSubcards.map((subcard) => (
                        <div className="subcard" key={subcard.id}>
                            <TiDelete className="subcard-delete-icon" onClick={() => handleDelete(subcard.id)} />
                            <div className="subcard-main" onClick={() => handleClick(subcard)} >
                                <div className="subcard-top">
                                    <h4>{subcard.title}</h4>
                                    <div className="subcard-top-bottom-section">
                                        <div className="rating-container">
                                            <p className={chooseColor(subcard.rating)}>{subcard.rating}</p>
                                        </div>
                                        <div className="category-container">
                                            <p>{subcard.category}</p>
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
                        </div>
                    ))
                    }
                </div >
            }
            {subcard && subcardFormActive && <SubcardForm subcard={subcard} setSubcardFormActive={setSubcardFormActive} project={project} cId={cId} />}
            {deletePopupActive && subId && <DeletePopup setDeletePopupActive={setDeletePopupActive} subId={subId} project={project} />}
        </>
    )
}
