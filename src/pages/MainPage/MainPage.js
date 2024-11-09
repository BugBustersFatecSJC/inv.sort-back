import {useState} from 'react';
import Sidebari from '../../components/Sidebar/Sidebar';
import UserProfileIcon from '../../components/UserProfileIcon/UserProfileIcon';
import Loading from '../../components/Loading/Loading';
import CategoryButtons from '../../components/CategoryButtons/CategoryButtons';

function MainPage(props) {
  const [loading, setloading] = useState(false);
  const loadingIcon = () => {
    setloading((prevLoading) => !prevLoading);
  };
  
  return (
    <div className='flex main-color-bg min-h-[105vh]  '>
      
      <Sidebari />

      <div className='w-[100%]  flex flex-col items-center '>
      
        <div className='flex flex-col w-full items-end justify-start p-4'>
          <UserProfileIcon />
        </div>
        
        <div className='w-[90%]  mx-auto flex flex-col'>
          <div className='w-full flex justify-start'>
            <h1 className='text-2xl sm:text-4xl poppins-semibold'>{props.title}</h1>
          </div>

          <main className=''>
            {props.children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default MainPage;