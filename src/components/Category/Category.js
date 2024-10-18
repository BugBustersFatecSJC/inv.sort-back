import { useState } from 'react'
import api from '../../services/api'
import FlashMessage from '../../components/FlashMessage/FlashMessage'

/**
 * Container para adicionar uma nova categoria
 */

function Category(props) {
    /**
     * Lógica para o modal
     */
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [categoryName, setCategoryName] = useState('')

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    /**
     * Renderização da flash message
     */
    const [flash, setFlash] = useState(null)

    const flashSuccess = () => {
        setFlash({ message: 'Item adicionado com sucesso!', type: 'success' });
    }

    const flashError = () => {
        setFlash({ message: 'Um erro aconteceu', type: 'error' });
    };

    const flashInfo = () => {
        setFlash({ message: 'Item atualizado', type: 'info' });
    }

    const flashDelete = () => {
        setFlash({ message: 'Item deletado', type: 'success' });
    }

    /**
     * Form para enviar os dados da categoria
     */
    const handleSubmit = async(e) => {
        e.preventDefault()

        const categoryData = {
            category_name: categoryName,
        }

        try {
            await api
            .post("/category", categoryData)
            .then(response => props.onCategoryAdded(response.data))

            setCategoryName('')

            closeModal()
            flashSuccess()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div onClick={openModal} className='w-full alt-color-2-bg rounded shadow-md mt-4 mb-[40px] cursor-pointer'>
                <div className='p-[1rem] h-[200px] flex flex-col items-center justify-center'>
                    <i class="fa-solid fa-plus text-4xl"></i>
                    <p className='mt-4'>Adicionar categoria</p>
                </div>
            </div>

            {isModalOpen && (
            <div className="modal modal-open text-slate-400">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-white">Adicionar nova categoria</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-white">Nome da categoria</span>
                            </label>
                            <input type="text" placeholder="Digite o nome da categoria" className="input input-bordered placeholder:text-slate-300" required value={categoryName} onChange={(e) => setCategoryName(e.target.value)} name='category-name' />
                        </div>

                        <div className="modal-action">
                            <label htmlFor="category-modal" className="btn" onClick={closeModal}>Cancelar</label>
                            <button type="submit" className="btn btn-primary">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
            )}

            {/* Componente flash message, verifica se o estado flash é true e então renderiza a flash message */}
            {flash && (
                <FlashMessage
                message={flash.message}
                type={flash.type}
                duration={3000}
                />
            )}
        </>
    )
}

export default Category
