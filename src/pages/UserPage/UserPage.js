import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import SearchBar from '../../components/SearchBar/SearchBar';
import UserDetails from '../../components/UserDetails/UserDetails';
import MainPage from '../../pages/MainPage/MainPage'




const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const fetchUsers =() =>{
    api.get('/users') // Alterar para a URL correta do back-end
    .then(response => {
      console.log('log',response.data);
      return response.data;
       // Definir os usuários vindos do back-end
    })
    .catch(() => {
      setError('Erro ao buscar usuários');
    });
  }
  useEffect(() => {
    api.get('/users') // Alterar para a URL correta do back-end
    .then(response => {
      
      
      setUsers(response.data);
       // Definir os usuários vindos do back-end
    })
    .catch(() => {
      setError('Erro ao buscar usuários');
    });
  }, []);


  const handleSearch = (query) => {
    const foundUser = users.find(u => u.username.toLowerCase() === query.toLowerCase());
    if (query === '') {
      setError('Digite um nome de usuário');
    }
    else if (foundUser) {
      setUser(foundUser);
      setUsers([])
      setError('');
    } else {
      setUser(null);
      setUsers(fetchUsers)
      setError('Usuário não encontrado!');
    }
  };


  fetchUsers();
  return (
    <MainPage title="Gerencie usuários">
      
      <div className="flex-1 flex justify-center items-center bg-brorange-800">
        <div className="flex border-4 border-[rgb(107,55,16)] h-5/6 w-1/2 bg-[rgb(255,195,118)]">
          <section className="border-4 border-[rgb(180,81,5)] h-full w-full shadow-inner p-4">
            <div className='flex justify-between'>
            <SearchBar onSearch={handleSearch} /> <button  className='appearence-none shadow-none bg-[#B45105] rounded px-2 h-full my-auto text-[#3E1900] poppins-semibold'>Refresh</button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <UserDetails user={user} bool={'true'} />
            
            {users.map(user => (
        <UserDetails user={user}/>
      ))}
          </section>
        </div>
      </div>
    </MainPage>
  );
};

export default UserPage;