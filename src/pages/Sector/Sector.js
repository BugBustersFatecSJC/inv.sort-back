import { useState, useEffect } from 'react';
import api from '../../services/api';
import MainPage from '../MainPage/MainPage';
import LocalModal from '../../components/SectorModal/LocalModal';
import SectorModal from '../../components/SectorModal/SectorModal';
import EditSectorModal from '../../components/SectorModal/EditSectorModal'; // Importar o componente para editar setores
import EditLocalModal from '../../components/SectorModal/EditLocalModal'; // Importar o componente para editar locais
import Loading from '../../components/Loading/Loading';
import ModalDelete from '../../components/ModalDelete/ModalDelete';

function LocalPage() {
  const [loading, setLoading] = useState(true);
  const [locals, setLocals] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [showLocalModal, setShowLocalModal] = useState(false);
  const [showSectorModal, setShowSectorModal] = useState(false);
  const [showEditSectorModal, setShowEditSectorModal] = useState(false);
  const [showEditLocalModal, setShowEditLocalModal] = useState(false);
  const [currentLocalId, setCurrentLocalId] = useState(null);
  const [currentSector, setCurrentSector] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Setor atual para edição


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

  const updateLocal = (updatedLocal) => {
    setLocals((prevLocals) =>
      prevLocals.map((local) =>
        local.local_id === updatedLocal.local_id ? updatedLocal : local
      )
    );
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

  const handleLocalDelete = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/local/${currentLocalId}`)
      .then(deleteLocal(currentLocalId))
      setOpenDeleteModal(false)
    } catch (err) {
      console.error(err);
    }
  }
  const openDeleteModalLocal = (local) => {
    setCurrentLocalId(local.local_id);
    setOpenDeleteModal(true)
  };
  const deleteLocal = (localId) => {
    setLocals((prevLocals) => prevLocals.filter(local => local.local_id !== localId))
 }


  return (
    <MainPage title="Gestão de Locais e Setores">
      {loading ? (
        <Loading />
      ) : (
        <>
      <div className="product-table w-full bg-[#FFC376] border-4 border-[#85450D]">
      <div className='border-4 border-[#B45105] p-3'>
        <h2 className="text-center font-pixel text-2x1 mb-4 px-4 py-2">
        
          <button onClick={() => setShowLocalModal(true)} className='font-pixel bg-[#362010] border-4 border-black text-[#F4BD76]'>Adicionar Novo Local</button> </h2>
          
          {locals.map((local) => (
            <div key={local.local_id} className="local-item">
              <div className=' font-pixel flex space-x-6 border-4 border-[#B45105] p-3'> 
              <h3>Local: {local.local_name}</h3>
              <p>Endereço: {local.local_address}</p>
              <button onClick={() => openEditLocalModal(local)} className='font-pixel bg-[#362010] border-4 border-black text-[#F4BD76]'>Editar Local</button>
              <button onClick={() => openDeleteModalLocal(local)} className='font-pixel bg-[#362010] border-4 border-black text-[#F4BD76]'>Excluir Local</button>
              <h4>Setores:</h4>
              <ul>
                {sectors
                  .filter((sector) => sector.local_id === local.local_id)
                  .map((sector) => (
                    <li key={sector.sector_id}>
                      {sector.sector_name}
                      <button onClick={() => openEditSectorModal(sector)} className='font-pixel bg-[#362010] border-4 border-black text-[#F4BD76]'>Editar</button>
                      <button onClick={() => deleteSector(sector.sector_id)} className='font-pixel bg-[#362010] border-4 border-black text-[#F4BD76]'>Excluir</button>
                    </li>
                  ))}
              </ul> 
              <button onClick={() => openSectorModal(local.local_id)}className='font-pixel bg-[#362010] border-4 border-black text-[#F4BD76]'>Adicionar Setor</button>
              
              </div>
            </div>
          ))}
          </div>
          </div>
        </>
      )}

      {showLocalModal && <LocalModal onLocalAdded={addLocal} onClose={() => setShowLocalModal(false)} />}
      {showSectorModal && <SectorModal localId={currentLocalId} onSectorAdded={addSector} onClose={() => setShowSectorModal(false)} />}
      {showEditSectorModal && <EditSectorModal sector={currentSector} onSectorUpdated={updateSector} onClose={() => setShowEditSectorModal(false)} />}
      {showEditLocalModal && <EditLocalModal localId={currentLocalId} onLocalUpdated={updateLocal} onClose={() => setShowEditLocalModal(false)} />}
      {openDeleteModal && <ModalDelete title="Deseja excluir o local?" handleSubmit={handleLocalDelete} closeModal={() => setOpenDeleteModal(false)}><div className="form-control mb-4">
          </div></ModalDelete>}
    </MainPage>
  );
}

export default LocalPage;
