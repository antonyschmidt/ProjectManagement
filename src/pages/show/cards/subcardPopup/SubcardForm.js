import { useState } from 'react'
//icons
import { MdOutlineLabel } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { TbResize } from "react-icons/tb";
import { AiOutlineClockCircle } from "react-icons/ai";
//hooks
import { useFirestore } from '../../../../hooks/useFirestore'
//services
import Select from 'react-select';
//components
import EditRating from './EditRating';
import EditStatus from './EditStatus';
//styles
import './SubcardForm.css'
import { useClickOutside } from '../../../../hooks/useClickOutside';

export default function SubcardForm({ setSubcardFormActive, subcard, project, cId }) {
    const { updateDocument } = useFirestore('projects')
    const { domNode } = useClickOutside(() => {
        handleSubmit()
    })
    const [title, setTitle] = useState(subcard.title)
    const [description, setDescription] = useState(subcard.description)
    const [selectedOption, setSelectedOption] = useState([])
    const [assignedUsers, setAssignedUsers] = useState(subcard.assignedUsers)
    const [rating, setRating] = useState(subcard.rating)
    const [status, setStatus] = useState(subcard.status)
    const [category, setCategory] = useState(subcard.category)
    // edit states
    const [ratingEdit, setRatingEdit] = useState(false)
    const [statusEdit, setStatusEdit] = useState(false)


    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault()
        }

        if (title !== subcard.title) {

            let result = []

            project.subcards.map((subcard) => {
                result.push(subcard)
            })

            const SubCardIndex = result.findIndex((s) => s.id === subcard.id)

            result[SubCardIndex].title = title

            await updateDocument(project.id, {
                subcards: [
                    ...result
                ]
            })

        }

        setTitle(subcard.title)
    }

    const chooseColor = (i) => {
        switch (i) {
            case 'low':
                return 'priority-pill-low';
            case 'mid':
                return 'priority-pill-mid';
            case 'high':
                return 'priority-pill-high';
        }
    }

    return (
        <div className="popup-container">
            <div className='click-outside-container' onClick={() => setSubcardFormActive(false)} />
            <div className='subcard-show-container'>
                <div className="subcard-show-section-top">
                    <TbResize className='resize-icon' />
                    <div className="date-section">
                        <AiOutlineClockCircle />
                        <p>Created</p>
                        <p className='createdAt'>{subcard.createdAt}</p>
                    </div>
                </div>
                <div className="subcard-show-section-one">
                    <form onSubmit={handleSubmit}>
                        <input
                            ref={domNode}
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            spellCheck='false'
                        />
                    </form>
                    <div className="widget-container">
                        <AiOutlineHeart />
                        <MdDelete />
                    </div>
                </div>
                <div className="subcard-show-section-two">
                    <div className="key-value-container">
                        <div className="key">
                            <BiCategoryAlt />
                            <p>category</p>
                        </div>
                        <div className="value">
                            <p className='category'>{category}</p>
                        </div>
                    </div>
                    <div className="key-value-container">
                        <div className="key">
                            <AiOutlineStar />
                            <p>rating</p>
                        </div>
                        <div className="value">
                            <div className='value-click' onClick={() => ratingEdit ? setRatingEdit(false) : setRatingEdit(true)} />
                            <p className={chooseColor(rating)}>{rating}</p>
                            {ratingEdit && <EditRating setRating={setRating} rating={rating} val={chooseColor(rating)} setRatingEdit={setRatingEdit} project={project} subcard={subcard} />}
                        </div>
                    </div>
                    <div className="key-value-container">
                        <div className="key">
                            <MdOutlineLabel />
                            <p>status</p>
                        </div>
                        <div className="value">
                            <div className='value-click' onClick={() => statusEdit ? setStatusEdit(false) : setStatusEdit(true)} />
                            <p className='status'>{status}</p>
                            {statusEdit && <EditStatus setStatus={setStatus} status={status} setStatusEdit={setStatusEdit} project={project} subcard={subcard} cId={cId} />}
                        </div>
                    </div>
                    <div className="key-value-container">
                        <div className="key">
                            <FiUsers />
                            <p>team</p>
                        </div>
                        <div className="value">
                            {assignedUsers.length > 0 ? assignedUsers.map((user) => (
                                <p>{user.title}</p>
                            )) : <p>no - users</p>}
                        </div>
                    </div>
                </div>
                <div className="subcard-show-section-three">
                    <div className="section-three-nav-container">
                        <div className="section-three-links">
                            <p className='description-tag-section-three'>description</p>
                            <div className="comment-nav-container">
                                <p>comments</p>
                                <p>2</p>
                            </div>
                        </div>
                        <div className="seperation-line" />
                        <textarea
                            placeholder='Enter text'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}


// <form className='subcard-form' onSubmit={handleSubmit}>
//                     <div className="subcard-input-container-top">
//                         <label>
//                             <span>Title</span>
//                             <input
//                                 type="text"
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 value={title}
//                             />
//                         </label>
//                         <label >
//                             <span>Status</span>
//                             <Select
//                                 defaultValue={selectedOption}
//                                 onChange={setSelectedOption}
//                                 options={options}
//                             />
//                         </label>
//                         <label>

//                         </label>
//                     </div>
//                     <label>
//                         <span>Description</span>
//                         <div className="subcard-seperation-line" />
//                         <textarea cols="54" rows="10">{subcard.description}</textarea>
//                     </label>
//                     {/* {error && <p className='error'>{error}</p>}
//                     {response.error && <p className='error'>{response.error}</p>} */}
//                 </form>