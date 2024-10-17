import React from 'react';
import { useNavigate } from 'react-router-dom';

function CategoryButtons() {
  // const navigate = useNavigate()

  // const handleClick = () => {
  //     navigate('/userpage')
  // }

  return (
    <div className='w-[90%] justify-center  absolute flex flex-col justify-between align-middle'>
      <a className=" text-center my-8  w-full p-2 alt-color-5-bg text-black shadow-lg font-pixel mb-1 text-2xl main-color border-4 border-black">
        Usuários
      </a>
      <a href='/products' className="text-center my-8  w-full p-2 alt-color-5-bg text-black shadow-lg font-pixel mb-1 text-2xl main-color border-4 border-black">
        Produtos
      </a>
      
      <a href='/analytics' className="text-center my-8 w-100% p-2 alt-color-5-bg text-black shadow-lg font-pixel text-2xl main-color border-4 border-black">
       Analytics
      </a>
    </div>
  );
}

export default CategoryButtons;
