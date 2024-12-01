import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import MainPage from '../MainPage/MainPage';
import Loading from '../../components/Loading/Loading';
import SearchBarAlt from '../../components/SearchBarAlt/SearchBarAlt';
import './Supplier.css';
import FlashMessage from '../../components/FlashMessage/FlashMessage';
import ShortModal from '../../components/ShortModal/ShortModal';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'; // Ícones para navegação

function SupplierPage() {
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [lastAddedId, setLastAddedId] = useState(null);
  const [flash, setFlash] = useState(null);
  const [supplierName, setSupplierName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [nameError, setNameError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Número de fornecedores por página

  const fetchSuppliers = async () => {
    try {
      const response = await api.get('/supplier');
      setSuppliers(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchSuppliers();
  }, []);

  const addSupplier = (newSupplier) => {
    setSuppliers((prevSuppliers) => [...prevSuppliers, newSupplier]);
    setLastAddedId(newSupplier.supplier_id);
  };

  const updateSupplier = (supplierId, updatedSupplier) => {
    setSuppliers((prevSuppliers) =>
      prevSuppliers.map((supplier) =>
        supplier.supplier_id === supplierId ? { ...supplier, ...updatedSupplier } : supplier
      )
    );
  };

  const removeSupplier = async (supplierId) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir este fornecedor?');
    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/supplier/${supplierId}`);
      setSuppliers((prevSuppliers) =>
        prevSuppliers.filter((supplier) => supplier.supplier_id !== supplierId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const toggleModal = (supplier = null) => {
    setSelectedSupplier(supplier);
    setShowModal(!showModal);
    if (supplier) {
      setSupplierName(supplier.supplier_name);
      setContactInfo(supplier.contact_info || '');
      setAddress(supplier.address || '');
    } else {
      setSupplierName('');
      setContactInfo('');
      setAddress('');
      setNameError(null);
    }
  };

  const showFlashMessage = (message, type) => {
    setFlash({ message, type });
    setTimeout(() => setFlash(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supplierData = {
      supplier_name: supplierName,
      contact_info: contactInfo,
      address: address,
    };

    try {
      if (selectedSupplier) {
        await api.put(`/supplier/${selectedSupplier.supplier_id}`, supplierData);
        updateSupplier(selectedSupplier.supplier_id, supplierData);
      } else {
        const response = await api.post('/supplier', supplierData);
        addSupplier(response.data);
      }
      showFlashMessage('Fornecedor salvo com sucesso!', 'success');
      toggleModal();
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400 && err.response.data.error.code === 'P2002') {
        setNameError("Já existe um fornecedor com o mesmo nome");
      }
      showFlashMessage('Um erro aconteceu', 'error');
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplier_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);

  const paginationRange = () => {
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

  const currentSuppliers = filteredSuppliers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <MainPage title="Gestão de Fornecedores">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="product-table w-full bg-[#FFC376]">
            <div>
              <div className="flex justify-between w-full items-end mb-6 table-header-container">
                <div className="flex items-end">
                  <p className="font-pixel text-2xl cursor-pointer" onClick={() => toggleModal()}>
                    Adicionar novo fornecedor
                  </p>
                  <i className="fa-solid fa-plus ml-2 text-lg text-bold text-green-500"></i>
                </div>
                <SearchBarAlt onSearch={handleSearch} />
              </div>

              <div className="overflow-x-auto w-full">
                <table className="min-w-[600px] w-full border-collapse main-table">
                  <thead>
                    <tr>
                      <th className="text-2xl font-pixel py-2 w-1/2 text-left">Nome</th>
                      <th className="text-2xl font-pixel py-2 w-1/6 text-left">Contato</th>
                      <th className="text-2xl font-pixel py-2 w-1/4 text-left">Endereço</th>
                      <th className="text-2xl font-pixel py-2 w-[10%]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSuppliers.map((supplier, index) => {
                      const rowBgColor = index % 2 === 0 ? '#EA9457' : '#F5A66D';
                      const buttonBgColor = index % 2 === 0 ? '#F2B080' : '#F7B687';

                      return (
                        <motion.tr
                          key={supplier.supplier_id}
                          initial={lastAddedId === supplier.supplier_id ? { scale: 0.8, opacity: 0 } : {}}
                          animate={lastAddedId === supplier.supplier_id ? { scale: 1, opacity: 1 } : {}}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            duration: 0.3
                          }}
                          className={`${rowBgColor} border-b border-[#FFCB8F] hover:bg-orange-100`}
                          style={{ backgroundColor: rowBgColor }}
                        >
                          <td className="border border-[#FFCB8F] p-2 py-3 w-1/2">
                            {supplier.supplier_name}
                          </td>
                          <td className="border border-[#FFCB8F] p-2 w-1/6">
                            {supplier.contact_info}
                          </td>
                          <td className="border border-[#FFCB8F] p-2 w-1/4">
                            {supplier.address}
                          </td>
                          <td className="flex items-center justify-center w-[10%]">
                            <div className="space-x-4">
                              <button
                                className="hover:bg-green-600 px-3 py-2 text-white rounded-md"
                                style={{ backgroundColor: buttonBgColor }}
                                onClick={() => toggleModal(supplier)}
                              >
                                Editar
                              </button>
                              <button
                                className="hover:bg-red-600 px-3 py-2 text-white rounded-md"
                                style={{ backgroundColor: buttonBgColor }}
                                onClick={() => removeSupplier(supplier.supplier_id)}
                              >
                                Excluir
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* Paginação */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={goToPreviousPage}
                  className="bg-[#6B3710] text-[#FFC376] font-medium px-4 py-2 rounded-lg mr-2 hover:bg-[#4e2d19] disabled:bg-[#4c2a17] disabled:text-[#ccc] disabled:cursor-not-allowed"
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
                      onClick={() => goToPage(page)}
                      className={`px-4 py-2 rounded-lg ${currentPage === page ? 'bg-[#4e2d19] text-[#FFC376]' : 'text-[#6B3710] hover:bg-[#C17B46]'}`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={goToNextPage}
                  className="bg-[#6B3710] text-[#FFC376] font-medium px-4 py-2 rounded-lg ml-2 hover:bg-[#4e2d19] disabled:bg-[#4c2a17] disabled:text-[#ccc] disabled:cursor-not-allowed"
                  disabled={currentPage === totalPages}
                >
                  <ChevronRightIcon className="h-5 w-5 text-[#FFC376]" />
                </button>
              </div>
            </div>
          </div>

          {/* Modal de Adicionar/Editar Fornecedor */}
          {showModal && (
            <ShortModal
              show={showModal}
              onClose={toggleModal}
              onSubmit={handleSubmit}
              nameError={nameError}
              supplierName={supplierName}
              setSupplierName={setSupplierName}
              contactInfo={contactInfo}
              setContactInfo={setContactInfo}
              address={address}
              setAddress={setAddress}
            />
          )}
        </>
      )}
    </MainPage>
  );
}

export default SupplierPage;
