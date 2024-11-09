import { useState, useEffect } from 'react';
import ProductRow from '../../components/ProductRow/ProductRow2';
import api from '../../services/api';
import SearchBar from '../SearchBar/SearchBar';
import { useParams } from 'react-router-dom';
import ProductCell from '../ProductCell/ProductCell';
//Fluxo de Estoque, Usado No Buy And Sell
const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtrado, setFiltrado] = useState(products);
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
  const filtrarProducts = (products) => {
    return products.filter((product) => {

      if(searchTerm==='') return true;
      else if (product.product_name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
      
    });
  }
  const handleSearch = (query) => {
    setSearchTerm(query);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    setFiltrado(filtrarProducts(products));
  }, [searchTerm]);
  return (
    <div className="product-table  max-h-[70%] ">
      <SearchBar handlesSearch={handleSearch} />
      <div className='  flex grid mt-4  overflow-y-auto  grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-center justify-center flex-wrap gap-2 p-1'>
      {searchTerm==''?products.map((product, index) => (
              <ProductCell product={product} key={index} />
               )):filtrado.map((product, index) => (
                <ProductCell product={product} key={index} />
                 ))}
        

      </div>
      
      {/* Dados Fornecedor */}


      
    </div>
  );
};

export default ProductTable;
