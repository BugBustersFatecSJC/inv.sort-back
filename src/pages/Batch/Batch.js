import { useState, useEffect } from 'react';
import api from '../../services/api';
import MainPage from '../MainPage/MainPage';
import BatchModal from '../../components/BatchModal/batchModal';
import Loading from '../../components/Loading/Loading';

function BatchPage() {
  const [loading, setLoading] = useState(true);
  const [batches, setBatches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null); // Novo estado para o lote em edição
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Para confirmação de exclusão
  const [batchToDelete, setBatchToDelete] = useState(null); // Lote a ser deletado

  const fetchBatches = async () => {
    try {
      const response = await api.get('/batch');
      setBatches(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchBatches();
  }, []);

  const addBatch = (newBatch) => {
    setBatches((prevBatches) => [...prevBatches, newBatch]);
  };

  const removeBatch = async (batchId) => {
    try {
      await api.delete(`/batch/${batchId}`);
      setBatches((prevBatches) =>
        prevBatches.filter((batch) => batch.batch_id !== batchId)
      );
      setShowDeleteConfirm(false); // Fechar modal de confirmação
    } catch (err) {
      console.error(err);
    }
  };

  const updateBatch = (batchId, updatedBatch) => {
    setBatches((prevBatches) =>
      prevBatches.map((batch) =>
        batch.batch_id === batchId ? { ...batch, ...updatedBatch } : batch
      )
    );
    setEditingBatch(null); // Resetar lote em edição
  };

  const toggleModal = () => {
    setEditingBatch(null); // Resetar lote em edição ao abrir modal
    setShowModal(!showModal);
  };

  const handleEditClick = (batch) => {
    setEditingBatch(batch); // Definir lote a ser editado
    toggleModal(); // Abrir modal
  };

  const confirmDeleteBatch = (batch) => {
    setBatchToDelete(batch);
    setShowDeleteConfirm(true);
  };

  return (
    <MainPage title="Gestão de Lotes">
      {loading ? (
        <Loading />
      ) : (
        <>
          <button onClick={toggleModal}>Adicionar Novo Lote</button>
          {batches.map((batch) => (
            <div key={batch.batch_id} className="batch-item">
              <h3>Lote {batch.batch_id}</h3>
              <p>ID do Produto: {batch.product_id}</p>
              <p>Quantidade: {batch.quantity}</p>
              <p>
                Data de Validade:{' '}
                {batch.expiration_date
                  ? new Date(batch.expiration_date).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p>
                Data de Fabricação:{' '}
                {batch.manufacture_date
                  ? new Date(batch.manufacture_date).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p>
                Valor Total do Lote:{' '}
                {batch.batch_value_total
                  ? batch.batch_value_total.toFixed(2)
                  : 'N/A'}
              </p>
              <button onClick={() => handleEditClick(batch)}>Editar</button>
              <button onClick={() => confirmDeleteBatch(batch)}>Excluir</button>
            </div>
          ))}

          {showModal && (
            <BatchModal
              onBatchAdded={addBatch}
              onBatchUpdated={updateBatch}
              batch={editingBatch} // Passar lote a ser editado
              onClose={toggleModal}
            />
          )}

          {showDeleteConfirm && (
            <div className="modal modal-open">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Confirmar Exclusão</h3>
                <p>Tem certeza que deseja excluir o lote {batchToDelete.batch_id}?</p>
                <div className="modal-action">
                  <button onClick={() => removeBatch(batchToDelete.batch_id)} className="btn">
                    Sim
                  </button>
                  <button onClick={() => setShowDeleteConfirm(false)} className="btn">
                    Não
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </MainPage>
  );
}

export default BatchPage;
