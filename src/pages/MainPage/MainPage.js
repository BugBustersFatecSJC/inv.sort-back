import { useContext, useState } from 'react';
import Sidebari from '../../components/Sidebar/Sidebar';
import UserProfileIcon from '../../components/UserProfileIcon/UserProfileIcon';
import CategoryButtons from '../../components/CategoryButtons/CategoryButtons';
import Loading from '../../components/Loading/Loading';
import { UserContext } from '../../context/userContext'; 

function MainPage(props) {
  const [loading, setLoading] = useState(false);
  const { role } = useContext(UserContext);

  const toggleLoading = () => {
    setLoading((prevLoading) => !prevLoading);
  };

  if (loading) {
    return <Loading />; 
  }

  return (
    <div className='flex main-color-bg h-[100vh]'>
      <Sidebari role={role} content={<CategoryButtons />} />

      <div className='w-[100%] flex flex-col items-center'>
        <div className='flex flex-col w-full items-end justify-start p-4'>
          <UserProfileIcon />
        </div>
        
        <div className='w-[90%] mx-auto flex flex-col'>
          <div className='w-full flex justify-start'>
            <h1 className='text-4xl font-pixel'>{props.title}</h1>
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
