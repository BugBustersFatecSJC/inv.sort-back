import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import SearchBar from '../../components/SearchBar/SearchBar';
import UserDetails from '../../components/UserDetails/UserDetails';
import MainPage from '../../pages/MainPage/MainPage';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    api.get('/users') 
      .then(response => {
        setUsers(response.data);
        setUser(null);
      })
      .catch(() => {
        setError('Erro ao buscar usuários');
      });
  };

  const handleSearch = (query) => {
    const foundUser = users.find(u => u.username.toLowerCase() === query.toLowerCase());
    if (query === '') {
      setError('Digite um nome de usuário');
    } else if (foundUser) {
      setUser(foundUser);
      setUsers([]);
      setError('');
    } else {
      setUser(null);
      fetchUsers();
      setError('Usuário não encontrado!');
    }
  };

  const handleDelete = (userId) => {
    api.delete(`/users/${userId}`)
      .then(() => {
        setUsers(users.filter(u => u.user_id !== userId));
      })
      .catch(err => {
        setError('Erro ao deletar usuário');
      });
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => user.user_id === userId ? { ...user, role: newRole } : user));
  };

  return (
    <MainPage title="Gerencie usuários">
      <div className="flex-1 flex justify-center items-center bg-brorange-800">
        <div className="flex border-4 border-[rgb(107,55,16)] h-5/6 w-1/2 bg-[rgb(255,195,118)]">
          <section className="border-4 border-[rgb(180,81,5)] h-full w-full shadow-inner p-4">
            <div className='flex justify-between'>
              <SearchBar onSearch={handleSearch} />
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {user && (
              <UserDetails 
                user={user}
                onUserRoleChange={handleRoleChange}
                onDelete={handleDelete}
              />
            )}
            {users.map(user => (
              <UserDetails 
                key={user.user_id} 
                user={user}
                onUserRoleChange={handleRoleChange}
                onDelete={handleDelete}
              />
            ))}
          </section>
        </div>
      </div>
    </MainPage>
  );
};

export default UserPage;
