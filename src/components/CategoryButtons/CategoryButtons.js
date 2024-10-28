import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function CategoryButtons() {
  const location = useLocation();
  const navigate = useNavigate();

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
       navigate('/analytics')
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
    
    <a id='/products' onClick={navigateProducts} className="poppins-semibold  cursor-pointer hvr-grow categorybutton">
    Produtos
    </a>
    <a id='/analytics' onClick={navigateAnalytics} className="poppins-semibold cursor-pointer hvr-grow categorybutton">
    Análise
    </a>
      <a id='/userpage' onClick={navigateUserpage} className="poppins-semibold cursor-pointer hvr-grow categorybutton">
    Usuários
    </a>

    <a id='/gerenciar' onClick={navigateUserpage} className="poppins-semibold cursor-pointer hvr-grow categorybutton">
      Gerenciar
    </a>
    <a id='/batches' onClick={navigateBatches} className="poppins-semibold cursor-pointer hvr-grow categorybutton">
      Lotes
    </a>

    <a id='/suppliers' onClick={navigateSuppliers} className="poppins-semibold cursor-pointer hvr-grow categorybutton">
      Fornecedores
    </a>

    <a id='/sectors' onClick={navigateSectors} className="poppins-semibold cursor-pointer hvr-grow categorybutton">
      Setores
    </a>

    <a onClick={navigateSectors} className="poppins-semibold cursor-pointer hvr-grow categorybutton">
      Movimentações
    </a>

    <a id='/historic' onClick={navigateMovements} className="poppins-semibold cursor-pointer hvr-grow categorybutton">
      Histórico
    </a>

    <a id='/buyandsell' onClick={navigateBuyAndSell} className="poppins-semibold cursor-pointer hvr-grow categorybutton">
      Compra e Venda
    </a>
    </div>
  );
}

export default CategoryButtons;
