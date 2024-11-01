import {useState} from 'react';
import Sidebari from '../../components/Sidebar/Sidebar';
import UserProfileIcon from '../../components/UserProfileIcon/UserProfileIcon';



function MainPage(props) {
  const [loading, setloading] = useState(false);
  const loadingIcon = () => {
    setloading((prevLoading) => !prevLoading);
  };
  console.log(loadingIcon);
  console.log(loading);
  
  
  return (
    <div className='flex main-color-bg min-h-[100vh]  '>
      
      <Sidebari />

      <div className='w-[100%]  flex flex-col items-center'>
      
        <div className='flex flex-col w-full items-end justify-start p-4'>
          <UserProfileIcon />
        </div>
        
        <div className='w-[100%]  mx-auto flex flex-col'>
          <div className='w-full flex justify-start'>
            <h1 className='text-4xl ml-8 poppins-semibold'>{props.title}</h1>
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