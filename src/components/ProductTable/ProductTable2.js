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
    <div className="product-table w-full">
      <div className='border-4 border-[#B45105] p-6'>
        <SearchBar />
        <h2 className="text-center poppins-medium text-2sm mb-4 px-4 py-2">Lotes</h2>
        <table className="w-full border-collapse ">
          <thead>
            <tr className="">
              <th className=" text-sm poppins-medium px-4 py-2">ID</th>
              <th className=" text-sm poppins-medium px-4 py-2">Nome</th>
              <th className=" text-sm poppins-medium px-4 py-2">Categoria</th>
              <th className=" text-sm poppins-medium px-4 py-2">Un. de medida</th>
              <th className=" text-sm poppins-medium px-4 py-2">Preço</th>
              <th className=" text-sm poppins-medium px-4 py-2">Quantidade</th>
              <th className=" text-sm poppins-medium px-4 py-2">Estoque</th>
              <th className=" text-sm poppins-medium px-4 py-2">Preço uni.</th>
              <th className=" text-sm poppins-medium px-4 py-2">Qtd lotes</th>
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
          <button className="bg-[#36571C] poppins-medium border-4 border-black text-[#F4BD76] px-6 py-2 hover:bg-[#4b2b1f]">
            Compra
          </button>
          
          <button className="bg-[#AF0909] poppins-medium border-4 border-black text-[#F4BD76] px-6 py-2 hover:bg-[#4b2b1f]">
            Venda
          </button>

         
        </div>
        {/* separa o centro */}


      </div>
      {/* Dados Fornecedor */}


      
    </div>
  );
};

export default ProductTable;
