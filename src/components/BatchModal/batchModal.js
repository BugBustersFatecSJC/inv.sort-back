import { useState, useEffect } from 'react';
import api from '../../services/api';
import FlashMessage from '../../components/FlashMessage/FlashMessage';
import Modal from '../Modal/Modal';

function Batch(props) {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      if (response.data && Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error('Erro: Nenhum produto encontrado ou a resposta está em um formato inesperado.');
      }
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    }
  };

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBatch = async () => {
    try {
      const response = await api.get('/batch');
      setBatches(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchBatch();
  }, []);

  const [flash, setFlash] = useState(null);

  const showFlashMessage = (message, type) => {
    setFlash(null);
    setTimeout(() => {
      setFlash({ message, type });
    }, 0);
  };

  const flashSuccess = () => {
    showFlashMessage('Item adicionado com sucesso!', 'success');
  };

  const flashError = () => {
    showFlashMessage('Um erro aconteceu', 'error');
  };

  const flashDelete = () => {
    showFlashMessage('Item deletado', 'success');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [productId, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setBatchQuantity] = useState('');
  const [expiration_date, setExpirationDate] = useState('');
  const [manufacture_date, setManufactureDate] = useState('');
  const [batch_value_total, setTotalValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const manufactureDateISO = manufacture_date ? new Date(manufacture_date).toISOString() : null;
    const expirationDateISO = expiration_date ? new Date(expiration_date).toISOString() : null;

    const BatchData = {
      product_id: productId,
      product_name: productName,
      quantity: quantity,
      expiration_date: expirationDateISO,
      manufacture_date: manufactureDateISO,
      batch_value_total: parseFloat(batch_value_total),
    };

    try {
      await api.post('/batch', BatchData).then(response => props.onBatchAdded(response.data));

      setProductID('');
      setProductName('');
      setBatchQuantity('');
      setExpirationDate('');
      setManufactureDate('');
      setTotalValue('');
      flashSuccess();
      closeModal();
    } catch (err) {
      console.log(err);
      flashError();
    }
  };

  const handleDelete = async (batch_id) => {
    try {
      await api.delete(`/batch/${batch_id}`).then((response) => { console.log(response); });
      props.onBatchDeleted(batch_id);
      flashDelete();
    } catch (err) {
      console.log(err);
      flashError();
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={openModal}>
        Adicionar novo lote
      </button>

      {isModalOpen && (
        <div className="modal modal-open text-slate-400">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-white">Adicionar novo lote</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-white">Quantidade</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Digite a quantidade"
                  className="input input-bordered placeholder:text-slate-300"
                  value={quantity}
                  onChange={(e) => setBatchQuantity(e.target.value)}
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-white">Produto</span>
                </label>
                <select
                  value={productId}
                  onChange={(e) => setProductID(parseInt(e.target.value))}
                  className="select select-bordered"
                >
                  <option disabled value="">Selecionar produto</option>
                  {products.length > 0 ? (
                    products.map((products) => (
                      <option key={products.product_id} value={products.product_id}>
                        {products.product_name}
                      </option>
                    ))
                  ) : (
                    <option disabled value="">Nenhum produto encontrado</option>
                  )}
                </select>
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-white">Data de Fabricação</span>
                </label>
                <input
                  type="date"
                  name="manufacture_date"
                  className="input input-bordered"
                  value={manufacture_date}
                  onChange={(e) => setManufactureDate(e.target.value)}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-white">Data de Validade</span>
                </label>
                <input
                  type="date"
                  name="expiration_date"
                  className="input input-bordered"
                  value={expiration_date}
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-white">Valor Total do Lote</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="batch_value_total"
                  placeholder="Digite o valor total"
                  className="input input-bordered placeholder:text-slate-300"
                  value={batch_value_total}
                  onChange={(e) => setTotalValue(e.target.value)}
                />
              </div>

              <div className="modal-action">
                <button type="button" className="btn" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Salvar
                </button>
              </div>
            </form>

            {/* Exibir lotes em quadradinhos */}
            <h3 className="font-bold text-lg text-white mt-6">Lotes Adicionados</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {batches.map((batch) => (
                <div key={batch.batch_id} className="bg-slate-700 rounded-lg p-4">
                  <h4 className="font-bold text-white">{batch.product_name}</h4>
                  <p className="text-slate-300">Quantidade: {batch.quantity}</p>
                  <p className="text-slate-300">Data de Fabricação: {new Date(batch.manufacture_date).toLocaleDateString()}</p>
                  <p className="text-slate-300">Data de Validade: {new Date(batch.expiration_date).toLocaleDateString()}</p>
                  <p className="text-slate-300">Valor Total: R$ {batch.batch_value_total.toFixed(2)}</p>
                  <button className="btn btn-red mt-2" onClick={() => handleDelete(batch.batch_id)}>Deletar</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Batch;
