import { useState, useEffect } from 'react';
import ProductRow from '../../components/ProductRow/ProductRow2';
import api from '../../services/api';
import SearchBar from '../SearchBar/SearchBar';
//Fluxo de Estoque, Usado No Buy And Sell
const ProductTable = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-table w-full bg-[#FFC376] border-4 border-[#85450D]">
      <div className='border-4 border-[#B45105] p-6'>
        <SearchBar />
        <h2 className="text-center font-pixel text-2xl mb-4 px-4 py-2">Lotes</h2>
        <table className="w-full border-collapse ">
          <thead>
            <tr className="">
              <th className=" text-xl font-pixel px-4 py-2">ID</th>
              <th className=" text-xl font-pixel px-4 py-2">Nome</th>
              <th className=" text-xl font-pixel px-4 py-2">Categoria</th>
              <th className=" text-xl font-pixel px-4 py-2">Un. de medida</th>
              <th className=" text-xl font-pixel px-4 py-2">Preço</th>
              <th className=" text-xl font-pixel px-4 py-2">Quantidade</th>
              <th className=" text-xl font-pixel px-4 py-2">Estoque</th>
              <th className=" text-xl font-pixel px-4 py-2">Preço uni.</th>
              <th className=" text-xl font-pixel px-4 py-2">Qtd lotes</th>
            </tr>
          </thead>
          <tbody className=' border-4 border-[#b5651d]' >
            {products.map((product, index) => (
              <ProductRow
                key={index}
                product={product}
                bgColor={index % 2 === 0 ? "bg-[#F5A66D]" : "bg-[#EA9457]"}
              />
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <button className="bg-[#36571C] font-pixel border-4 border-black text-[#F4BD76] px-6 py-2 hover:bg-[#4b2b1f]">
            Compra
          </button>
          
          <button className="bg-[#AF0909] font-pixel border-4 border-black text-[#F4BD76] px-6 py-2 hover:bg-[#4b2b1f]">
            Venda
          </button>

         
        </div>
        {/* separa o centro */}


        <div className="m-4">
          <div className="flex justify-between">
            <div className="vt323-regular flex w-[45%] flex-col">
              {/* Descrição do Produto */}

              <div className="mt-2 pr-1 max-h-64 w-[100%] overflow-auto">
                {/* Título da Tabela */}
                <div className="flex vt323-regular px-2 justify-between">
                  <p>N° do Lote</p>
                  <p>Data da Compra</p>
                  <p>Validade</p>
                </div>

                <div className="flex vt323-regular justify-between px-2 w-full min-h-6 bg-[rgb(245,148,87)]">
                  <p>0</p>
                  <p>01/04/2024</p>
                  <p>12/10/2024</p>
                </div>
                <div className="flex vt323-regular justify-between px-2 w-full min-h-6 bg-[rgb(245,166,109)]">
                  <p>1</p>
                  <p>13/01/2022</p>
                  <p>22/07/2024</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
      {/* Dados Fornecedor */}


      
    </div>
  );
};

export default ProductTable;
