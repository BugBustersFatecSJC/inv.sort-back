import React from 'react'
import { useNavigate } from 'react-router-dom'

function CategoryButtons() {
  const navigate = useNavigate()

  const navigateUserpage = () => {
    const user = localStorage.getItem("user")
    const jsonUser = JSON.parse(user)
    if (jsonUser.role === "admin" || jsonUser.role === "gerente") {  
      navigate('/userpage') }
    else {alert("Você não tem permissão para fazer isso")}   
  }

  const navigateProducts = () => {
      navigate('/products')
  }

  const navigateAnalytics = () => {
      // navigate('/analytics')
  }

  const navigateMovements = () => {
      navigate('/historic')
  }

  const navigateBatches = () => {
      navigate('/batches')
  }

  const navigateSectors = () => {
      navigate('/sectors')
  }

  const navigateSuppliers = () => {
      navigate('/suppliers')
  }

  const navigateBuyAndSell = () => {
      navigate('/buyandsell')
  }
  
  const navigateRegisterUser = () => {
      navigate('/cadastra-usuario')
  }

  return (
    <div className='flex flex-col w-full'>
      <a onClick={navigateRegisterUser} className="text-center mb-3  w-full p-1 alt-color-5-bg text-black shadow-lg font-pixel mb-1 text-xl main-color border-3 border-black cursor-pointer cursor-pointer hvr-grow">
        Usuários
      </a>

      <a onClick={navigateUserpage} className="text-center mb-3  w-full p-1 alt-color-5-bg text-black shadow-lg font-pixel mb-1 text-xl main-color border-3 border-black cursor-pointer cursor-pointer hvr-grow">
        Gerenciar
      </a>

      <a onClick={navigateProducts} className="text-center mb-3  w-full p-1 alt-color-5-bg text-black shadow-lg font-pixel mb-1 text-xl main-color border-3 border-black cursor-pointer hvr-grow">
        Produtos
      </a>
      
      <a onClick={navigateAnalytics} className="text-center mb-3 w-full p-1 alt-color-5-bg text-black shadow-lg font-pixel text-xl main-color border-3 border-black cursor-pointer hvr-grow">
       Análise
      </a>      

      <a onClick={navigateMovements} className="text-center mb-3 w-full p-1 alt-color-5-bg text-black shadow-lg font-pixel text-xl main-color border-3 border-black cursor-pointer hvr-grow">
       Histórico
      </a>

      <a onClick={navigateBatches} className="text-center mb-3 w-full p-1 alt-color-5-bg text-black shadow-lg font-pixel text-xl main-color border-3 border-black cursor-pointer hvr-grow">
       Lotes
      </a>

      <a onClick={navigateSuppliers} className="text-center mb-3 w-full p-1 alt-color-5-bg text-black shadow-lg font-pixel text-xl main-color border-3 border-black cursor-pointer hvr-grow">
       Fornecedores
      </a>

      <a onClick={navigateSectors} className="text-center mb-3 w-full p-1 alt-color-5-bg text-black shadow-lg font-pixel text-xl main-color border-3 border-black cursor-pointer hvr-grow">
       Setores
      </a>

      <a onClick={navigateBuyAndSell} className="text-center mb-3 w-full p-1 alt-color-5-bg text-black shadow-lg font-pixel text-xl main-color border-3 border-black cursor-pointer hvr-grow">
       Fluxo de Estoque
       </a>

      <a onClick={navigateSectors} className="text-center mb-3 w-full p-1 alt-color-5-bg text-black shadow-lg font-pixel text-xl main-color border-3 border-black cursor-pointer hvr-grow">
       Movimentações
      </a>
    </div>
  );
}

export default CategoryButtons;
