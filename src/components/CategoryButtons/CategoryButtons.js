import React from 'react';

function CategoryButtons() {
  return (
    <div>
      <button className="w-full p-2 alt-color-5-bg text-black shadow-lg font-pixel mb-1 text-2xl">
        Usuários
      </button>
      <button className="w-full p-2 alt-color-5-bg text-black shadow-lg font-pixel mb-1 text-2xl">
        Produtos
      </button>
      <button className="w-full p-2 alt-color-5-bg text-black shadow-lg font-pixel mb-1 text-2xl">
        Histórico
      </button>
      <button className="w-full p-2 alt-color-5-bg text-black shadow-lg font-pixel text-2xl">
        Análise
      </button>
    </div>
  );
}

export default CategoryButtons;
