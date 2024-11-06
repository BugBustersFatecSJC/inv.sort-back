import { useState, useEffect } from 'react';
import api from '../../services/api';
import FlashMessage from '../../components/FlashMessage/FlashMessage';
import Modal from '../Modal/Modal';

function SupplierModal({ supplier, onSupplierAdded, onSupplierUpdated, onClose }) {
  const [flash, setFlash] = useState(null);
  const [supplierName, setSupplierName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (supplier) {
      setSupplierName(supplier.supplier_name);
      setContactInfo(supplier.contact_info || '');
      setAddress(supplier.address || '');
    } else {
      setSupplierName('');
      setContactInfo('');
      setAddress('');
    }
  }, [supplier]);

  const showFlashMessage = (message, type) => {
    setFlash(null);
    setTimeout(() => {
      setFlash({ message, type });
    }, 0);
  };

  const flashSuccess = () => {
    showFlashMessage('Fornecedor salvo com sucesso!', 'success');
  };

  const flashError = () => {
    showFlashMessage('Um erro aconteceu', 'error');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supplierData = {
      supplier_name: supplierName,
      contact_info: contactInfo,
      address: address,
    };

    try {
      if (supplier) {
        // Edição
        await api.put(`/supplier/${supplier.supplier_id}`, supplierData);
        onSupplierUpdated(supplier.supplier_id, supplierData);
      } else {
        // Adição
        const response = await api.post('/supplier', supplierData);
        onSupplierAdded(response.data);
      }
      flashSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      flashError();
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{supplier ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">Nome do Fornecedor</label>
            <input
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">Informações de Contato</label>
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="input input-bordered"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">Endereço</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input input-bordered"
            />
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </form>
        {flash && <FlashMessage message={flash.message} type={flash.type} />}
      </div>
    </div>
  );
}

export default SupplierModal;
