import { useState } from 'react';
import api from '../../services/api';
import FlashMessage from '../../components/FlashMessage/FlashMessage';

function EditSectorModal({ sector, onSectorUpdated, onClose }) {
  const [sectorName, setSectorName] = useState(sector.sector_name);
  const [flash, setFlash] = useState(null);

  const showFlashMessage = (message, type) => {
    setFlash({ message, type });
    setTimeout(() => setFlash(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/sector/${sector.sector_id}`, { sector_name: sectorName });
      onSectorUpdated(response.data);
      showFlashMessage('Setor atualizado com sucesso!', 'success');
      onClose();
    } catch (err) {
      console.error(err);
      showFlashMessage('Erro ao atualizar o setor', 'error');
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Editar Setor</h3>

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

export default EditSectorModal;
