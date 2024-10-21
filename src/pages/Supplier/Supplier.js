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
          <button onClick={() => toggleModal()}>Adicionar Novo Fornecedor</button>
          {suppliers.map((supplier) => (
            <div key={supplier.supplier_id} className="supplier-item">
              <h3>{supplier.supplier_name}</h3>
              <p>Informações de Contato: {supplier.contact_info}</p>
              <p>Endereço: {supplier.address}</p>
              <button onClick={() => toggleModal(supplier)}>Editar</button>
              <button onClick={() => removeSupplier(supplier.supplier_id)}>Excluir</button>
            </div>
          ))}
        </>
      )}

      {showModal && <SupplierModal supplier={selectedSupplier} onSupplierAdded={addSupplier} onSupplierUpdated={updateSupplier} onClose={toggleModal} />}
    </MainPage>
  );
}

export default SupplierPage;