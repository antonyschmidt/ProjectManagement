//hooks
import { useFirestore } from '../../../../hooks/useFirestore'
import { useClickOutside } from '../../../../hooks/useClickOutside'
//styles
import './EditRating.css'

export default function EditRating({ rating, val, setRatingEdit, project, subcard, setRating }) {
    const { updateDocument, response } = useFirestore('projects')
    const { domNode } = useClickOutside(() => {
        setRatingEdit(false)
    })

    const handleClick = async (rating) => {


        let result = []

        project.subcards.map((subcard) => {
            result.push(subcard)
        })

        const SubCardIndex = result.findIndex((s) => s.id === subcard.id)

        result[SubCardIndex].rating = rating

        await updateDocument(project.id, {
            subcards: [
                ...result
            ]
        })

        setRating(rating)
        setRatingEdit(false)


    }


    return (
        <div className="edit-rating" ref={domNode}>
            <div className="rating-cotainer" onClick={() => setRatingEdit(false)}>
                <p className={val}>{rating}</p>
            </div>
            {rating !== 'low' && <div className="rating-cotainer">
                <p className='priority-pill-low' onClick={() => handleClick('low')} > low</p>
            </div>}
            {
                rating !== 'mid' && <div className="rating-cotainer">
                    <p className='priority-pill-mid' onClick={() => handleClick('mid')} > mid</p>
                </div >}
            {
                rating !== 'high' && <div className="rating-cotainer">
                    <p className='priority-pill-high' onClick={() => handleClick('high')}>high</p>
                </div>
            }
        </div >
    )
}
