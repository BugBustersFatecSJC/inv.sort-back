import React from 'react';

const UserDetails = ({ user }) => {
  if (!user) {
    return <p className="text-red-500 mt-4">User not found.</p>;
  }

  return (
    <div className="mt-4 p-4 border-4 border-orange-700 bg-yellow-300 rounded-lg shadow-inner w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-2">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
