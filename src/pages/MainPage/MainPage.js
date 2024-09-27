import {useState} from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import UserProfileIcon from '../../components/UserProfileIcon/UserProfileIcon';
import SendButton from '../../components/SendButton/SendButton';
import Loading from '../../components/Loading/Loading';

function MainPage() {
  const [loading, setloading] = useState(false);
  const loadingIcon = () => {
    setloading((prevLoading) => !prevLoading);
  };

  return (
    <div className='main-color-bg flex'>
      <Sidebar />

      <div className='w-full flex flex-col items-center'>
        <div className='flex flex-col w-full items-end justify-start p-4'>
          <UserProfileIcon />
        </div>

        <div className='w-full flex justify-center'>
          <button onClick={loadingIcon}>Testing</button>
        </div>
        <div className='w-full flex justify-center'>
          {loading ? <Loading /> : <p>Não está carregando...</p>}
        </div>
      </div>
    </div>
  );
}

export default MainPage;