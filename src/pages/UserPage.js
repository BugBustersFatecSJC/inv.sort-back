import React, { useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import UserDetails from '../components/UserDetails/UserDetails';

const MOCK_USERS = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin', photo: '/images/gordao.png' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User', photo: 'link_da_foto' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'Moderator', photo: 'link_da_foto' },
];

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = (query) => {
    const foundUser = MOCK_USERS.find(u => u.name.toLowerCase() === query.toLowerCase());
    if (foundUser) {
      setUser(foundUser);
      setError('');
    } else {
      setUser(null);
      setError('User not found.');
    }
  };

  return (
    <div className="flex min-h-screen">
      <nav className="w-1/4 bg-brown-600 text-white p-4">
        <h2 className="font-vt323 text-lg">Perfil de Usuário</h2>
        <ul>
          <li>Opção 1</li>
          <li>Opção 2</li>
          <li>Opção 3</li>
        </ul>
      </nav>
      <div className="flex-1 flex justify-center items-center bg-yellow-100">
        <div className="flex border-4 border-[rgb(107,55,16)] h-5/6 w-1/2 bg-[rgb(255,195,118)]">
          <section className="border-4 border-[rgb(180,81,5)] h-full w-full shadow-inner p-4">
            <SearchBar onSearch={handleSearch} />
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <UserDetails user={user} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
