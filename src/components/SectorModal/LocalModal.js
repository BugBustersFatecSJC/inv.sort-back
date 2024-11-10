import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import FlashMessage from '../../components/FlashMessage/FlashMessage';
import ShortModal from '../../components/ShortModal/ShortModal';

function LocalModal({ localId, onClose, onLocalAdded, isEditMode }) {
  const [localName, setLocalName] = useState('');
  const [localAddress, setLocalAddress] = useState('');
  const [flash, setFlash] = useState(null);

  useEffect(() => {
    if (isEditMode && localId) {
      const fetchLocal = async () => {
        try {
          const response = await api.get(`/local/${localId}`);
          setLocalName(response.data.local_name);
          setLocalAddress(response.data.local_address);
        } catch (err) {
          console.error(err);
          showFlashMessage('Erro ao carregar os dados do local', 'error');
        }
      };
      fetchLocal();
    }
  }, [isEditMode, localId]);

  const showFlashMessage = (message, type) => {
    setFlash({ message, type });
    setTimeout(() => setFlash(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isEditMode) {
        response = await api.put(`/local/${localId}`, { local_name: localName, local_address: localAddress });
        showFlashMessage('Local atualizado com sucesso!', 'success');
      } else {
        response = await api.post('/local', { local_name: localName, local_address: localAddress });
        onLocalAdded(response.data);
        showFlashMessage('Local adicionado com sucesso!', 'success');
      }

      setLocalName('');
      setLocalAddress('');
      onClose();
    } catch (err) {
      console.error(err);
      showFlashMessage('Erro ao salvar o local', 'error');
    }
  };

  const modalTitle = isEditMode ? 'Editar Local' : 'Adicionar Novo Local';

  return (
    <ShortModal title={modalTitle} handleSubmit={handleSubmit} closeModal={onClose} modalName="localModal">
      <div className="form-control mb-4">
        <label className="label">Nome do Local</label>
        <input
          type="text"
          className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          required
        />
      </div>

      <div className="form-control mb-4">
        <label className="label">Endereço</label>
        <input
          type="text"
          className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
          value={localAddress}
          onChange={(e) => setLocalAddress(e.target.value)}
        />
      </div>

      {flash && <FlashMessage message={flash.message} type={flash.type} />}
    </ShortModal>
  );
}

export default LocalModal;
