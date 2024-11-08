import { useState, useEffect } from 'react';
import ProductRow from '../../components/ProductRow/ProductRow2';
import api from '../../services/api';
import SearchBar from '../SearchBar/SearchBar';
import { useParams } from 'react-router-dom';
import ProductCell from '../ProductCell/ProductCell';
//Fluxo de Estoque, Usado No Buy And Sell
const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const id = useParams().id;
  console.log(id);
  
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products/category/' + id);
      setProducts(Array.isArray(response.data) ? response.data : []);
      console.log(response.data);
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-table w-full">
      <div className='  flex grid mt-4 overflow-y-scroll grid-cols-2 text-center justify-center flex-wrap gap-2 p-1'>
      {products.map((product, index) => (
           <ProductCell product={product} key={index} />
            ))}
        

      </div>
      
      {/* Dados Fornecedor */}


      
    </div>
  );
};

export default ProductTable;
