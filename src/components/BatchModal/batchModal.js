import { useState, useEffect } from 'react';
import api from '../../services/api';
import FlashMessage from '../../components/FlashMessage/FlashMessage';
import Modal from '../Modal/Modal';

function BatchModal(props) {
  const [products, setProducts] = useState([]);
  const [flash, setFlash] = useState(null);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const [productId, setProductID] = useState(props.batch ? props.batch.product_id : '');
  const [quantity, setBatchQuantity] = useState(props.batch ? props.batch.quantity : '');
  const [expiration_date, setExpirationDate] = useState(props.batch ? props.batch.expiration_date : '');
  const [manufacture_date, setManufactureDate] = useState(props.batch ? props.batch.manufacture_date : '');
  const [batch_value_total, setTotalValue] = useState(props.batch ? props.batch.batch_value_total : '');

  useEffect(() => {
    if (props.batch) {
      setProductID(props.batch.product_id);
      setBatchQuantity(props.batch.quantity);
      setExpirationDate(props.batch.expiration_date);
      setManufactureDate(props.batch.manufacture_date);
      setTotalValue(props.batch.batch_value_total);
    } else {
      setProductID('');
      setBatchQuantity('');
      setExpirationDate('');
      setManufactureDate('');
      setTotalValue('');
    }
  }, [props.batch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const manufactureDateISO = manufacture_date ? new Date(manufacture_date).toISOString() : null;
    const expirationDateISO = expiration_date ? new Date(expiration_date).toISOString() : null;

    const BatchData = {
      product_id: productId,
      quantity: quantity,
      expiration_date: expirationDateISO,
      manufacture_date: manufactureDateISO,
      batch_value_total: parseFloat(batch_value_total),
    };

    try {
      if (props.batch) {
        // Atualiza o lote existente
        await api.put(`/batch/${props.batch.batch_id}`, BatchData);
        props.onBatchUpdated(props.batch.batch_id, BatchData);
      } else {
        // Adiciona um novo lote
        await api.post('/batch', BatchData).then(response => props.onBatchAdded(response.data));
      }
      flashSuccess();
      props.onClose();
    } catch (err) {
      console.log(err);
      flashError();
    }
  };

  const flashSuccess = () => {
    setFlash({ message: 'Lote salvo com sucesso!', type: 'success' });
    setTimeout(() => setFlash(null), 3000);
  };

  const flashError = () => {
    setFlash({ message: 'Erro ao salvar o lote.', type: 'error' });
    setTimeout(() => setFlash(null), 3000);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{props.batch ? 'Editar Lote' : 'Adicionar Novo Lote'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Quantidade</span>
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setBatchQuantity(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Produto</span>
            </label>
            <select
              value={productId}
              onChange={(e) => setProductID(e.target.value)}
              className="select select-bordered"
              required
            >
              <option value="">Selecione um produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Data de Validade</span>
            </label>
            <input
              type="date"
              value={expiration_date}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Data de Fabricação</span>
            </label>
            <input
              type="date"
              value={manufacture_date}
              onChange={(e) => setManufactureDate(e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Valor Total do Lote</span>
            </label>
            <input
              type="number"
              value={batch_value_total}
              onChange={(e) => setTotalValue(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          {flash && (
            <FlashMessage message={flash.message} type={flash.type} />
          )}
          <div className="modal-action">
            <button type="submit" className="btn">
              {props.batch ? 'Atualizar Lote' : 'Adicionar Lote'}
            </button>
            <button onClick={props.onClose} className="btn">
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BatchModal;
