import { useState, useEffect } from 'react';
import api from '../../services/api';
import MainPage from '../MainPage/MainPage';
import BatchModal from '../../components/BatchModal/batchModal';
import Loading from '../../components/Loading/Loading';

function BatchPage() {
  const [loading, setLoading] = useState(true);
  const [batches, setBatches] = useState([]);
  const [showModal, setShowModal] = useState(false);

  /**
   * Função para buscar os lotes da API
   */
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

  /**
   * Função para adicionar um novo lote dinamicamente
   */
  const addBatch = (newBatch) => {
    setBatches((prevBatches) => [...prevBatches, newBatch]);
  };

  /**
   * Função para remover um lote dinamicamente
   */
  const removeBatch = async (batchId) => {
    try {
      await api.delete(`/batch/${batchId}`);
      setBatches((prevBatches) =>
        prevBatches.filter((batch) => batch.batch_id !== batchId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Função para atualizar um lote dinamicamente
   */
  const updateBatch = (batchId, updatedBatch) => {
    setBatches((prevBatches) =>
      prevBatches.map((batch) =>
        batch.batch_id === batchId ? { ...batch, ...updatedBatch } : batch
      )
    );
  };

  /**
   * Função para abrir/fechar o modal
   */
  const toggleModal = () => {
    setShowModal(!showModal);
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
              <button
                onClick={() =>
                  updateBatch(batch.batch_id, { quantity: batch.quantity + 10 })
                }
              >
                Atualizar
              </button>
              <button onClick={() => removeBatch(batch.batch_id)}>
                Excluir
              </button>
            </div>
          ))}
        </>
      )}

      {showModal && <BatchModal onBatchAdded={addBatch} onClose={toggleModal} />}
    </MainPage>
  );
}

export default BatchPage;
