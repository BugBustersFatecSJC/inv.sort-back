import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

function UserProfileIcon() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const navigateUserProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className='flex items-center w-full justify-between'>
      {/* <img
            src="/img/logout.png"
            className="w-6 h-6 ms-[20px] cursor-pointer"
            alt="botão de logout"
            onClick={handleLogout}
      /> */}
      
      <div className="flex">
        <p className="poppins-regular text-sm mr-3 cursor-pointer" onClick={handleLogout}>Sair</p>
        <p className="poppins-regular text-sm mr-3 cursor-pointer">Notificações</p>
        <p className="poppins-regular text-sm mr-3 cursor-pointer">Configurações</p>
      </div>

      <div className="flex">
        <div className='me-3 flex flex-col justify-end text-end mr-4'> 
          <p className='poppins-medium text-[1rem] text-left'>
            {user.username}

          </p>
          <div className="flex justify-between">
            <p className='font-pixel text-[1rem]'>
              {user.role}
            </p>
          </div>
        </div>

        <figure 
          className='bg-white rounded-full w-[3rem] h-[3rem] flex items-center justify-center cursor-pointer' 
          onClick={navigateUserProfile}
        >
          {user.user_img ? (
            <img
              src={`http://localhost:3001${user.user_img}`}
              className="w-full h-full rounded-full"
              alt="imagem do usuário"
            />
          ) : (
            <i className="fa-solid fa-user-secret text-gray-400 text-3xl"></i>
          )}
        </figure>
      </div>
    </div>
  );
}

export default UserProfileIcon;