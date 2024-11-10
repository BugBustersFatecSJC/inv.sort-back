import { useState, useEffect } from 'react';
import api from '../../services/api';
import FlashMessage from '../../components/FlashMessage/FlashMessage';
import Loading from '../../components/Loading/Loading';
import MainPage from '../MainPage/MainPage';
import ShortModal from '../../components/ShortModal/ShortModal';

function SupplierPage() {
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [flash, setFlash] = useState(null);
  const [supplierName, setSupplierName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [nameError, setNameError] = useState(null)


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
    if (!confirmDelete) return;

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
      setNameError(null)
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
      console.log(err)
      if (err.response && err.response.status === 400 && err.response.data.error.code === 'P2002') {
          setNameError("Já existe um fornecedor com o mesmo nome")
      }
      showFlashMessage('Um erro aconteceu', 'error');
    }
  };

  return (
    <MainPage title="Gestão de Fornecedores">
      {loading ? (
        <Loading />
      ) : (
        <div className="product-table w-full bg-[#FFC376] border-4 border-[#85450D]">
          <div className="border-4 border-[#B45105] p-3">
            <h2 className="text-center font-pixel text-2x1 mb-4 px-4 py-2">
              <button onClick={() => toggleModal()}>Adicionar Novo Fornecedor</button>
            </h2>
            {suppliers.map((supplier) => (
              <div key={supplier.supplier_id} className="supplier-item flex vt323-regular justify-between px-2 bg-[rgb(245,148,87)]">
                <h3 className="text-center font-pixel text-2xl mb-4 px-4 py-2">{supplier.supplier_name}</h3>
                <p className="text-center font-pixel text-2xl mb-4 px-4 py-2">Informações de Contato: {supplier.contact_info}</p>
                <p className="text-center font-pixel text-2xl mb-4 px-4 py-2">Endereço: {supplier.address}</p>
                <div className="flex space-x-4">
                  <button onClick={() => toggleModal(supplier)} className="bg-[#362010] font-pixel border-4 border-black text-[#F4BD76]">Editar</button>
                  <button onClick={() => removeSupplier(supplier.supplier_id)} className="bg-[#362010] font-pixel border-4 border-black text-[#F4BD76]">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showModal && (
        <ShortModal title={selectedSupplier ? 'Editar Fornecedor' : 'Adicionar Fornecedor'} handleSubmit={handleSubmit} modalName="fornecedor-modal" closeModal={() => toggleModal()}>
          <div className="form-control mb-4">
            <label className="label">Nome do Fornecedor</label>
            <input
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
              required
            />
            {nameError && (
              <p className="text-red-500 mt-1 text-xl font-pixel">{nameError}</p>
            )}
          </div>

          <div className="form-control mb-4">
            <label className="label">Informações de Contato</label>
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">Endereço</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
            />
          </div>
        </ShortModal>
      )}

      {flash && <FlashMessage  message={flash.message} type={flash.type} duration={3000} onClose={() => setFlash(null)}  />}
    </MainPage>
  );
}

export default SupplierPage