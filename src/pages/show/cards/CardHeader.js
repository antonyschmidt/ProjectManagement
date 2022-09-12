import { useState } from "react";
//components
import DeletePopup from "../../../components/deletePopup/DeletePopup";
//icons
import { CgMoreO } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
//hooks
import { useClickOutside } from "../../../hooks/useClickOutside";
//styles
import './CardHeader.css'
import { useFirestore } from "../../../hooks/useFirestore";
import { useEffect } from "react";


export default function CardHeader({ card }) {
    const [moreOpen, setMoreOpen] = useState(false)
    const [deletePopupActive, setDeletePopupActive] = useState(false)
    const [edit, setEdit] = useState(false)
    const [editCardValue, setEditCardValue] = useState(card.status)
    const { updateDocument } = useFirestore('cards')
    const { domNode } = useClickOutside(() => {
        setMoreOpen(false)
        setEdit(false)
    })

    useEffect(() => {
        setEditCardValue(card.status)
    }, [card])

    const handleSubmit = async (e) => {
        e.preventDefault()

        await updateDocument(card.id, {
            status: editCardValue
        })

        setEdit(false)
        setMoreOpen(false)
        setEditCardValue(editCardValue)
    }

    return (
        <>
            <div className="header-container">
                {!moreOpen && <div className='header-bar-active'>
                    <h3 className="card-header-title">{card.status}</h3>
                    <CgMoreO className="more-subcard-icon" onClick={() => setMoreOpen(true)} />
                </div>}
                {moreOpen && <div ref={domNode} className='more-bar-active'>
                    {!edit && <h3 className="card-header-title">{card.status}</h3>}
                    {edit && <div className="card-form-container">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                onChange={(e) => setEditCardValue(e.target.value)}
                                value={editCardValue}
                            />
                            <button><BiCheck className="check-icon" /></button>
                        </form>
                    </div>}
                    {!edit && <div className="icon-container">
                        <BiEdit className="header-more-icon" onClick={() => setEdit(true)} />
                        <MdDelete className="header-more-icon" onClick={() => setDeletePopupActive(true)} />
                        <MdClose className="header-more-icon" onClick={() => setMoreOpen(false)} />
                    </div>}
                    {deletePopupActive && <DeletePopup setDeletePopupActive={setDeletePopupActive} id={card.id} c={'cards'} />}
                </div>}
            </div>
        </>
    )
}

