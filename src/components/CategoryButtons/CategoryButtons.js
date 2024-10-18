import React from 'react';
import { useNavigate } from 'react-router-dom';

function CategoryButtons() {
  const navigate = useNavigate()

  const navigateUserpage = () => {
      navigate('/userpage')
  }

  return (
    <div className='flex flex-col w-full'>
      <a onClick={navigateUserpage} className="text-center mb-3  w-full p-1 alt-color-5-bg text-black shadow-lg font-pixel mb-1 text-xl main-color border-3 border-black cursor-pointer hvr-grow">
        Usuários
      </a>
      <a href='' className="text-center mb-3  w-full p-1 alt-color-5-bg text-black shadow-lg font-pixel mb-1 text-xl main-color border-3 border-black hvr-grow">
        Produtos
      </a>
      
      <a href='' className="text-center mb-3 w-full p-1 alt-color-5-bg text-black shadow-lg font-pixel text-xl main-color border-3 border-black hvr-grow">
       Analytics
      </a>      

      <a href='' className="text-center mb-3 w-full p-1 alt-color-5-bg text-black shadow-lg font-pixel text-xl main-color border-3 border-black hvr-grow">
       Histórico
      </a>
    </div>
  );
}

export default CategoryButtons;
