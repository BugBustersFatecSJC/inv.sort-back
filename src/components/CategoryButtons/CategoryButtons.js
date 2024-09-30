import React from 'react';

function CategoryButtons() {
  return (
    <div>
      <button className="w-full p-2 alt-color-5-bg text-black shadow-lg font-pixel mb-1 text-2xl main-color border-4 border-black">
        Usuários
      </button>
      <button className="w-full p-2 alt-color-5-bg text-black shadow-lg font-pixel mb-1 text-2xl main-color border-4 border-black">
        Produtos
      </button>
      <button className="w-full p-2 alt-color-5-bg text-black shadow-lg font-pixel mb-1 text-2xl main-color border-4 border-black">
        Histórico
      </button>
      <button className="w-full p-2 alt-color-5-bg text-black shadow-lg font-pixel text-2xl main-color border-4 border-black">
        Análise
      </button>
    </div>
  );
}

export default CategoryButtons;
