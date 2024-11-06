import React from 'react';
import "./UserDetails.css";

const UserDetails = ({ user, onEdit, onDelete }) => {
  return (
    <div className="mt-4 p-4 border-4 border-[rgb(180,81,5)] bg-[rgb(255,195,118)] rounded-lg shadow-inner w-full text-center">
      {user ? (
        <>
          <div className="w-24 h-24 mb-4 rounded-full mx-auto">
            <img src={user.photo || '../../images/default.png'} alt={user.username} className="w-full h-full object-fill" />
          </div>
          <p className="font-vt323 text-2xl mb-2">{user.username}</p>
          <div className="p-2 mb-4">
            <p><strong>ID:</strong> {user.user_id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
          <div className="flex justify-center space-x-4 bg-[rgb(255,195,118)] rounded-md w-[30%] mx-auto py-2">
            <p className='cursor-pointer' onClick={() => onEdit(user)}>
              <i className="fa-solid fa-pen"></i>
            </p>
            <p className='cursor-pointer' onClick={() => onDelete(user.user_id)}>
              <i className="fa-solid fa-trash"></i>
            </p>
          </div>
        </>
      ) : (
        <>
          <img src="/images/magnifier.png" alt="Not Found" className="w-24 h-24 mx-auto mb-4" />
          <p className="text-red-500 mt-4">Busque por um usuário.</p>
        </>
      )}
    </div>
  );
};

export default UserDetails;
