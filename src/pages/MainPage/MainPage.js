import {useState} from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import UserProfileIcon from '../../components/UserProfileIcon/UserProfileIcon';
import Loading from '../../components/Loading/Loading';
import CategoryButtons from '../../components/CategoryButtons/CategoryButtons';

function MainPage(props) {
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

        <div className='w-[90%] mx-auto flex flex-col'>
          <div className='w-full flex justify-start'>
            <h1 className='text-4xl font-pixel'>{props.title}</h1>
          </div>

          <main>
            {props.children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default MainPage;