import { useState, useEffect } from 'react';
import api from '../../services/api';
import MainPage from '../MainPage/MainPage';
import SupplierModal from '../../components/SupplierModal/SupplierModal';
import Loading from '../../components/Loading/Loading';
import SearchBar from '../../components/SearchBar/SearchBar';

function SupplierPage() {
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

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
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplier_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainPage title="Gestão de Fornecedores">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="product-table w-full bg-[#FFC376]">
            <div className=''>
              <h2 className="font-pixel text-2xl mb-4 cursor-pointer" onClick={() => toggleModal()}>
                Adicionar Novo Fornecedor
              </h2>
              <SearchBar onSearch={handleSearch} />
              <table className="w-full border-collapse overflow-x-auto">
                <thead>
                  <tr>
                    <th className="text-2xl font-pixel py-2 w-1/2 text-left">Nome</th>
                    <th className="text-2xl font-pixel py-2 w-1/6 text-left">Contato</th>
                    <th className="text-2xl font-pixel py-2 w-1/4 text-left">Endereço</th>
                    <th className="text-2xl font-pixel py-2 w-[10%]"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier, index) => {
                    const rowBgColor = index % 2 === 0 ? '#EA9457' : '#F5A66D';
                    const buttonBgColor = index % 2 === 0 ? '#F2B080' : '#F7B687';

                    return (
                      <tr 
                        key={supplier.supplier_id} 
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
                        <td className="flex items-center justify-center space-x-4 w-full">
                          <div className='w-full flex justify-evenly my-2'>
                            <button 
                              onClick={() => toggleModal(supplier)} 
                              className="flex space-x-3 font-pixel p-2 justify-center items-center" 
                              style={{ backgroundColor: buttonBgColor }}
                            >
                              <i className="fa-solid fa-pencil"></i>
                            </button> 
                            <button 
                              onClick={() => removeSupplier(supplier.supplier_id)} 
                              className="flex space-x-3 font-pixel p-2 justify-center items-center" 
                              style={{ backgroundColor: buttonBgColor }}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
  
      {showModal && <SupplierModal supplier={selectedSupplier} onSupplierAdded={addSupplier} onSupplierUpdated={updateSupplier} onClose={toggleModal} />}
    </MainPage>
  );
}

export default SupplierPage;
