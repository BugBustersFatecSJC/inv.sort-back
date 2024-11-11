import MainPage from '../MainPage/MainPage';

import ProductRow from '../../components/ProductRow/ProductRow2';
import ProductTable from '../../components/ProductTable/ProductTable2';

import React, { useState, useEffect } from 'react'; // Importação dos hooks do React

import Sidebari from '../../components/Sidebar/Sidebari';

// Página para registrar compra e venda de estoque
function BuyAndSell() {
  const [products, setProducts] = useState([]); // Estado para armazenar os dados dos produtos

  // Função para buscar os produtos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products'); // Chama sua API para buscar os produtos
        const data = await res.json();
        setProducts(data); // Atualiza o estado com os dados dos produtos
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts(); // Chama a função para buscar os produtos ao carregar a página
  }, []);

  return (
    <MainPage title="Compra e Venda">
      <Sidebari />
      <div className="flex bg-[rgb(255,195,118)]  ">
        
        <section className="border-0 border-[rgb(180,81,5)]    w-full shadow-sm shadow-inner">

          {/* Barra de pesquisa (componente que você pode personalizar se necessário) */}
          <ProductTable products={products} /> {/* Passando os produtos como prop para o ProductTable */}

          
        </section>
      </div>
    </MainPage>
  );
}

export default BuyAndSell;
