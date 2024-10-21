import { useState, useEffect } from 'react';
import api from '../../services/api';
import MainPage from '../MainPage/MainPage';
import SupplierModal from '../../components/SupplierModal/SupplierModal'; // Renomeado para SupplierModal
import Loading from '../../components/Loading/Loading';

function SupplierPage() {
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null); // Para edição

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
      return; // Se o usuário cancelar, não faz nada
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

  return (
    <MainPage title="Gestão de Fornecedores">
      {loading ? (
        <Loading />
      ) : (
        <>
      <div className="product-table w-full bg-[#FFC376] border-4 border-[#85450D]">
      <div className='border-4 border-[#B45105] p-3'>
        <h2 className="text-center font-pixel text-2x1 mb-4 px-4 py-2">
          <button onClick={() => toggleModal()}>Adicionar Novo Fornecedor</button> </h2>
          {suppliers.map((supplier) => (
            <div key={supplier.supplier_id} className="supplier-item flex vt323-regular justify-between px-2 bg-[rgb(245,148,87)]">
              <h3 className="text-center font-pixel text-2xl mb-4 px-4 py-2">{supplier.supplier_name}</h3>
              <p className="text-center font-pixel text-2xl mb-4 px-4 py-2">Informações de Contato: {supplier.contact_info}</p>
              <p className="text-center font-pixel text-2xl mb-4 px-4 py-2">Endereço: {supplier.address}</p>
              <h3 className = " flex space-x-4">
              <button onClick={() => toggleModal(supplier)} className=" flex space-x-3 bg-[#362010] font-pixel border-4 border-black text-[#F4BD76]">Editar</button> 
              <button onClick={() => removeSupplier(supplier.supplier_id)} className=" flex space-x-3 bg-[#362010] font-pixel border-4 border-black text-[#F4BD76]">Excluir</button> </h3>
              
            </div>
          ))}
             </div>
      </div>
    
        </>
      )}

      {showModal && <SupplierModal supplier={selectedSupplier} onSupplierAdded={addSupplier} onSupplierUpdated={updateSupplier} onClose={toggleModal} />}
    </MainPage>
  );
}

export default SupplierPage;