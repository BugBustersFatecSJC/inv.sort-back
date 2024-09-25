import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import UserDetails from '../components/UserDetails';

const MOCK_USERS = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'Moderator' },
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
    <div className="flex justify-center items-center min-h-screen bg-yellow-100">
      <div className="flex border-4 border-brown-700 h-5/6 w-1/2 bg-yellow-300">
        <section className="border-4 border-orange-700 h-full w-full shadow-inner">
          <SearchBar onSearch={handleSearch} />
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <UserDetails user={user} />
        </section>
      </div>
    </div>
  );
};

export default UserPage;
