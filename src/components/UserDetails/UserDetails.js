import React from 'react';
import "./UserDetails.css"

const UserDetails = ({ user }) => {
  if (!user) {
    return <p className="text-red-500 mt-4">User not found.</p>;
  }

  return (
    <div className="mt-4 p-4 border-4 border-[rgb(180,81,5)] bg-[rgb(255,195,118)] rounded-lg shadow-inner w-full text-center">
      <img src={user.photo} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
      <p className="font-vt323 text-2xl mb-2">{user.name}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-2">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>
      <button id="Voltar" className="vt323-regular bg-[rgb(62,25,0)] w-28 text-[rgb(244,189,118)] border-4 border-black rounded px-4 py-2">Voltar</button>
    </div>
  );
};

export default UserDetails;