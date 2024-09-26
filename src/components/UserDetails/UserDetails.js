import "./UserDetails.css";

const UserDetails = ({ user }) => {
  return (
    <div className="mt-4 p-4 border-4 border-[rgb(180,81,5)] bg-[rgb(255,195,118)] rounded-lg shadow-inner w-full text-center">
      {user ? (
        <>
          {/* Exibir os detalhes do usuário encontrado */}
          <img src={user.photo || '/images/default.png'} alt={user.username} className="w-24 h-24 rounded-full mx-auto mb-4" />
          <p className="font-vt323 text-2xl mb-2">{user.username}</p>
          <div className="p-2 mb-4">
            <p><strong>ID:</strong> {user.user_id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        </>
      ) : (
        <>
          {/* Exibir mensagem e imagem quando não houver usuário */}
          <img src="/images/magnifier.png" alt="Not Found" className="w-24 h-24 mx-auto mb-4" />
          <p className="text-red-500 mt-4">Busque por um usuário.</p>
        </>
      )}
      <button id="Voltar" className="vt323-regular bg-[rgb(62,25,0)] w-28 text-[rgb(244,189,118)] border-4 border-black rounded px-4 py-2 mt-4">
        Voltar
      </button>
    </div>
  );
};

export default UserDetails;
