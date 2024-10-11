import {useState} from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import UserProfileIcon from '../../components/UserProfileIcon/UserProfileIcon';
import Loading from '../../components/Loading/Loading';
import CategoryButtons from '../../components/CategoryButtons/CategoryButtons';
import Mainchart from '../../components/MainChart/Mainchart';
import Sectorchart from '../../components/Sectorchart/Sectorchart'
function Analytics(props) {
  const [loading, setloading] = useState(false);
  const loadingIcon = () => {
    setloading((prevLoading) => !prevLoading);
  };
  
  return (
    <div className='main-color-bg flex'>
      
      <Sidebar />

      <div className='w-full flex overflow-auto flex flex-col items-center'>
      
        <div className='flex flex-col w-full items-end justify-start p-4'>
          <UserProfileIcon />
        </div>
        
        <div className='w-[100%] h-[50%] flex mx-auto px-8 flex grid grid-cols-3 gap-4'>
        <div className='flex-auto justify-center m-auto col-span-2 w-[100%] h-[50%]'>
        <Mainchart />
        </div>
        <div className=' flex flex-1  m-auto w-[100%] h-[100%] justify-center text-center'>
        <Sectorchart />  

        </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
