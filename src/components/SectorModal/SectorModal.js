import { useState } from 'react';
import api from '../../services/api';
import FlashMessage from '../../components/FlashMessage/FlashMessage';

function SectorModal({ localId, onSectorAdded, onClose }) {
  const [sectorName, setSectorName] = useState('');
  const [flash, setFlash] = useState(null);

  const showFlashMessage = (message, type) => {
    setFlash({ message, type });
    setTimeout(() => setFlash(null), 3000); // Exibir mensagem por 3 segundos
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/sector', { sector_name: sectorName, local_id: localId });
      onSectorAdded(response.data);
      showFlashMessage('Setor adicionado com sucesso!', 'success');
      setSectorName('');
      onClose(); // Fecha o modal
    } catch (err) {
      console.error(err);
      showFlashMessage('Erro ao adicionar o setor', 'error');
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Adicionar Novo Setor</h3>
        
        {flash && <FlashMessage message={flash.message} type={flash.type} />}

        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">Nome do Setor</label>
            <input
              type="text"
              className="input input-bordered"
              value={sectorName}
              onChange={(e) => setSectorName(e.target.value)}
              required
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
      </div>
    </div>
  );
}

export default SectorModal;
