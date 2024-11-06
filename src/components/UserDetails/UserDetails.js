import "./UserDetails.css";

const UserDetails = ({ user , bool , onClick }) => {
  
    
  
  return (
    <div className="mt-4 p-4 border-4 border-[rgb(180,81,5)] bg-[rgb(255,195,118)] rounded-lg shadow-inner w-full text-center">
      {user ? (
        <>
          {/* Exibir os detalhes do usuário encontrado */}
          <div className="w-24 h-24 mb-4 rounded-full mx-auto " >
            <img src={user.photo || '../../images/default.png'} alt={user.username} className="w-full h-full object-fill" />
          </div>
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
      <div>
      {bool === 'true' ? <button onClick={onClick}  id="Voltar" className="appearence-none shadow-none bg-[#B45105] rounded px-2 h-full text-[24px] my mx-auto text-[#3E1900] poppins-semibold">Voltar</button> : null}
      </div>
    </div>
  );
};

export default UserDetails;
