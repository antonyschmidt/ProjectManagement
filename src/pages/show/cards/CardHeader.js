import { useState } from "react";
//components
import DeletePopup from "../../../components/deletePopup/DeletePopup";
//icons
import { CgMoreO } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { MdInvertColors } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
//hooks
import { useClickOutside } from "../../../hooks/useClickOutside";
//styles
import './CardHeader.css'
import { useFirestore } from "../../../hooks/useFirestore";
import { useEffect } from "react";

const colors = [
    '#9381ff',
    '#ffc2d1',
    '#8ed4ff',
    '#b6ee9d',
    '#fecc42',
    '#fe6d73',
]

export default function CardHeader({ cId, subcards, card, project, }) {
    const [moreOpen, setMoreOpen] = useState(false)
    const [deletePopupActive, setDeletePopupActive] = useState(false)
    const [edit, setEdit] = useState(false)
    const [colorEdit, setColorEdit] = useState(false)
    const [editCardValue, setEditCardValue] = useState(card.status)
    const { updateDocument } = useFirestore('projects')
    const { domNode } = useClickOutside(() => {
        setMoreOpen(false)
        setColorEdit(false)
        setEdit(false)
    })

    const filteredSubcards = subcards.filter((subcard) => {

        return subcard.pid === cId
    })


    useEffect(() => {
        setEditCardValue(card.status)
    }, [card])

    const handleSubmit = async (e) => {
        e.preventDefault()

        card.status = editCardValue

        let result = []

        project.cards.map((card) => {
            result.push(card)
        })

        const cardIndex = result.findIndex((c) => c.cId === card.cId)

        result[cardIndex].status = editCardValue


        await updateDocument(project.id, {
            cards: [
                ...result
            ]
        })

        setEdit(false)
        setMoreOpen(false)
        setEditCardValue(editCardValue)
    }

    const handleColorClick = async (color) => {

        let result = []

        project.cards.map((card) => {
            result.push(card)
        })

        const cardIndex = result.findIndex((c) => c.cId === card.cId)

        result[cardIndex].color = color


        await updateDocument(project.id, {
            cards: [
                ...result
            ]
        })

        setColorEdit(false)
        setMoreOpen(false)
    }

    return (
        <>
            <div className="header-container">
                {!moreOpen && <div className='header-bar-active'>
                    <h3 className="card-header-title" style={{ backgroundColor: card.color }}>{card.status}<span className="subcard-counter">{filteredSubcards.length}</span></h3>
                    <CgMoreO className="more-subcard-icon" onClick={() => setMoreOpen(true)} />
                </div>}
                {moreOpen && <div ref={domNode} className='more-bar-active'>
                    {!edit && !colorEdit && <h3 className="card-header-title" style={{ backgroundColor: card.color }}>{card.status}</h3>}
                    {edit && <div className="card-form-container" style={{ backgroundColor: card.color }}>
                        <form onSubmit={handleSubmit}>
                            <input
                                spellCheck='false'
                                type="text"
                                onChange={(e) => setEditCardValue(e.target.value)}
                                value={editCardValue}
                            />
                            <button><BiCheck className="check-icon" /></button>
                        </form>
                    </div>}
                    {colorEdit && <div className="color-picker-container">
                        {colors.map((color) => (
                            <div
                                key={color}
                                style={{ backgroundColor: color }}
                                onClick={(e) => handleColorClick(color)}
                            />
                        ))}
                    </div>}
                    {!edit && !colorEdit && <div className="icon-container">
                        <MdInvertColors className="header-more-icon" onClick={() => setColorEdit(true)} />
                        <BiEdit className="header-more-icon" onClick={() => setEdit(true)} />
                        <MdDelete className="header-more-icon" onClick={() => setDeletePopupActive(true)} />
                    </div>}
                    {deletePopupActive && <DeletePopup setDeletePopupActive={setDeletePopupActive} cId={card.cId} project={project} />}
                </div>}
            </div>
        </>
    )
}

