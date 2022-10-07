import { useState } from 'react'
//hooks
import { useFirestore } from '../../../../hooks/useFirestore'
import { useClickOutside } from '../../../../hooks/useClickOutside'
//styles
import './EditCategory.css'

export default function EditCategory({ category, setCategory, setCategoryEdit, subcard, project }) {
    const [currentCategory, setCurrentCategory] = useState(category)
    const { updateDocument } = useFirestore('projects')
    const { domNode } = useClickOutside(() => {
        handleSubmit()
    })

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault()
        }

        if (currentCategory !== subcard.category) {

            let result = []

            project.subcards.map((subcard) => {
                result.push(subcard)
            })

            const SubCardIndex = result.findIndex((s) => s.id === subcard.id)

            result[SubCardIndex].category = (currentCategory.length > 0 ? currentCategory : 'none')

            await updateDocument(project.id, {
                subcards: [
                    ...result
                ]
            })

        }

        setCategory(currentCategory.length > 0 ? currentCategory : 'none')
        setCategoryEdit(false)
    }

    return (
        <div className='edit-category-container'>
            <form onSubmit={handleSubmit}>
                <input
                    autoFocus
                    ref={domNode}
                    maxLength='11'
                    spellCheck='false'
                    type="text"
                    onChange={(e) => setCurrentCategory(e.target.value)}
                    value={currentCategory}
                />
            </form>
        </div>
    )
}
