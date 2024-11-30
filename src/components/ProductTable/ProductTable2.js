import { useState, useEffect } from 'react';
import ProductCell from '../ProductCell/ProductCell';
import SearchBar from '../SearchBar/SearchBar';
import { useParams } from 'react-router-dom';

import ProductCell from '../ProductCell/ProductCell';
import Modal from '../Modal/Modal';
import Loading from '../Loading/Loading';

import api from '../../services/api';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'; // Icones da Filtragem


const ProductTable = () => {
  const [modal,setIsModalOpen] = useState(false)
  const [productname, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [nameError, setNameError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [flash, setFlash] = useState('');
  

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // Default to 20 for desktop


  const id = useParams().id || 0;
  

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products/category/' + id);
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.log(err);
    }
  };

  // Filter products based on search term
  const filterProducts = (products) => {
    return products.filter((product) => {
      if (searchTerm === '') return true;
      return product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  // Handle search input change
  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  // Update filtered products when search term changes
  useEffect(() => {
    setFilteredProducts(filterProducts(products));
  }, [searchTerm, products]);

  // Determine items per page based on screen size (mobile vs desktop)
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(6); // Mobile (6 items per page)
      } else {
        setItemsPerPage(20); // Desktop (20 items per page)
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);
  const openModal = (product_id) => {setProductId(product_id);setIsModalOpen(true);
    
  }
  
  
    const closeModal = () => {
        setIsModalOpen(false);
        setProductName('');
        setImagePreview(null);
        setNameError(null);
    };
  const flashSuccess = () => setFlash({ message: 'Item adicionado com sucesso!', type: 'success' });
  const flashError = () => setFlash({ message: 'Um erro aconteceu', type: 'error' });
  const flashDelete = () => {
      setFlash({ message: 'Item deletado', type: 'success' });
  }

  useEffect(() => {
  

    const formData = new FormData();
    formData.append("product_name", productname);
    const exibirproduto = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        console.log('response',response.data);
        setProductInfo(response.data);
       
        flashSuccess();
    } catch (err) {
        console.error(err);
        if (err.response?.status === 400 && err.response.data.error.code === 'P2002') {
            setNameError("Este produto já existe");
        }
        flashError();
  }
    }
    exibirproduto()
   }, [productId]);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination range for quick navigation
  const paginationRange = () => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentPageNumber = currentPage;
    let pages = [];

    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPageNumber <= 3) {
        pages = [1, 2, 3, '...', totalPages];
      } else if (currentPageNumber >= totalPages - 2) {
        pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [
          1,
          '...',
          currentPageNumber - 1,
          currentPageNumber,
          currentPageNumber + 1,
          '...',
          totalPages,
        ];
      }
    }

    return pages;
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  
  
  return (

    
    <div className="product-table max-h-[70%]">
    
      <SearchBar handlesSearch={handleSearch} />
      <div  className="flex cursor-pointer grid mt-4 overflow-y-auto grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-center justify-center flex-wrap gap-2 p-1">

        {currentItems.map((product, index) => (
          <ProductCell aoClickar={openModal} product={product} key={index} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination flex justify-center mt-4">
        <button
          className="bg-[#6B3710] text-[#FFC376] font-medium px-4 py-2 rounded-lg mr-2 hover:bg-[#4e2d19] disabled:bg-[#4c2a17] disabled:text-[#ccc] disabled:cursor-not-allowed"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="h-5 w-5 text-[#FFC376]" />

        </button>

        {paginationRange().map((page, index) =>
          page === '...' ? (
            <span key={index} className="px-4 py-2">...</span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg ${currentPage === page ? 'bg-[#4e2d19] text-[#FFC376]' : 'text-[#6B3710] hover:bg-[#C17B46]'}`}
            >
              {page}
            </button>
          )
        )}

        <button
          className="bg-[#6B3710] text-[#FFC376] font-medium px-4 py-2 rounded-lg ml-2 hover:bg-[#4e2d19] disabled:bg-[#4c2a17] disabled:text-[#ccc] disabled:cursor-not-allowed"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= filteredProducts.length}
        >
          <ChevronRightIcon className="h-5 w-5 text-[#FFC376]" />

        </button>
      </div>
      {/* Modal para exibir informações do produto */}
      {modal  ? <Modal   title={productInfo.product_name}
                    
                    modalName="cria-categoria"
                    closeModal={closeModal} >
                   {
                        productInfo ?  
                        <div className="flex flex-col  gap-4">
                          <div className='flex justify-between ' >
                          <img src={productInfo.product_img || '../../images/default.png'} alt={'image do produto:' + productInfo.product_name} className={`  sm:w-36 sm:h-36 ${productInfo.product_img===null?'rounded-full':'rounded-full border-[0.25rem] border-[#D87B26]'}  bg-[#3E1900]   m-auto object-fill `} />
                          <div className='mx-4'>
                              
                              <p> Estoque : {productInfo.product_stock} Un.</p>
                              <p> Valor de custo : R$ {productInfo.prod_cost_value}</p>
                              <p> Valor de venda : R$ {productInfo.prod_sell_value}</p>
                              <p> Estoque Mínimo : {productInfo.product_stock_min} Un.</p>
                              <p> É perecível : {toString(productInfo.is_perishable)}</p>
                             </div>
                          </div>
                        </div> : <Loading/>
                   }
                    </Modal>:''}
    </div>
  );
};

export default ProductTable;
