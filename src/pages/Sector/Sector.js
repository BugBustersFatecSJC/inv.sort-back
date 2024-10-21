import { useState, useEffect } from 'react';
import api from '../../services/api';
import MainPage from '../MainPage/MainPage';
import LocalModal from '../../components/SectorModal/LocalModal';
import SectorModal from '../../components/SectorModal/SectorModal';
import EditSectorModal from '../../components/SectorModal/EditSectorModal'; // Importar o componente para editar setores
import EditLocalModal from '../../components/SectorModal/EditLocalModal'; // Importar o componente para editar locais
import Loading from '../../components/Loading/Loading';

function LocalPage() {
  const [loading, setLoading] = useState(true);
  const [locals, setLocals] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [showLocalModal, setShowLocalModal] = useState(false);
  const [showSectorModal, setShowSectorModal] = useState(false);
  const [showEditSectorModal, setShowEditSectorModal] = useState(false);
  const [showEditLocalModal, setShowEditLocalModal] = useState(false);
  const [currentLocalId, setCurrentLocalId] = useState(null);
  const [currentSector, setCurrentSector] = useState(null); // Setor atual para edição

  const fetchLocals = async () => {
    try {
      const response = await api.get('/local');
      setLocals(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSectors = async () => {
    try {
      const response = await api.get('/sector');
      setSectors(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchLocals();
    fetchSectors();
  }, []);

  const addLocal = (newLocal) => {
    setLocals((prevLocals) => [...prevLocals, newLocal]);
  };

  const addSector = (newSector) => {
    setSectors((prevSectors) => [...prevSectors, newSector]);
  };

  const updateSector = (updatedSector) => {
    setSectors((prevSectors) =>
      prevSectors.map((sector) =>
        sector.sector_id === updatedSector.sector_id ? updatedSector : sector
      )
    );
  };

  const deleteSector = async (sectorId) => {
    try {
      await api.delete(`/sector/${sectorId}`);
      setSectors((prevSectors) => prevSectors.filter((sector) => sector.sector_id !== sectorId));
    } catch (err) {
      console.error(err);
    }
  };

  const openSectorModal = (localId) => {
    setCurrentLocalId(localId);
    setShowSectorModal(true);
  };

  const openEditSectorModal = (sector) => {
    setCurrentSector(sector);
    setShowEditSectorModal(true);
  };

  const openEditLocalModal = (local) => {
    setCurrentLocalId(local.local_id);
    setShowEditLocalModal(true);
  };

  return (
    <MainPage title="Gestão de Locais e Setores">
      {loading ? (
        <Loading />
      ) : (
        <>
          <button onClick={() => setShowLocalModal(true)}>Adicionar Novo Local</button>
          {locals.map((local) => (
            <div key={local.local_id} className="local-item">
              <h3>Local: {local.local_name}</h3>
              <p>Endereço: {local.local_address}</p>
              <button onClick={() => openEditLocalModal(local)}>Editar Local</button>

              <h4>Setores:</h4>
              <ul>
                {sectors
                  .filter((sector) => sector.local_id === local.local_id)
                  .map((sector) => (
                    <li key={sector.sector_id}>
                      {sector.sector_name}
                      <button onClick={() => openEditSectorModal(sector)}>Editar</button>
                      <button onClick={() => deleteSector(sector.sector_id)}>Excluir</button>
                    </li>
                  ))}
              </ul>

              <button onClick={() => openSectorModal(local.local_id)}>Adicionar Setor</button>
            </div>
          ))}
        </>
      )}

      {showLocalModal && <LocalModal onLocalAdded={addLocal} onClose={() => setShowLocalModal(false)} />}
      {showSectorModal && <SectorModal localId={currentLocalId} onSectorAdded={addSector} onClose={() => setShowSectorModal(false)} />}
      {showEditSectorModal && <EditSectorModal sector={currentSector} onSectorUpdated={updateSector} onClose={() => setShowEditSectorModal(false)} />}
      {showEditLocalModal && <EditLocalModal localId={currentLocalId} onClose={() => setShowEditLocalModal(false)} />}
    </MainPage>
  );
}

export default LocalPage;
