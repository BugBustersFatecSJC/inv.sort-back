import {useState,useEffect} from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import UserProfileIcon from '../../components/UserProfileIcon/UserProfileIcon';

import Mainchart from '../../components/MainChart/Mainchart';
import Sectorchart from '../../components/Sectorchart/Sectorchart'


function Analytics(props) {
  const [loading, setloading] = useState(false);
  const loadingIcon = () => {
    setloading((prevLoading) => !prevLoading);
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  })
  console.log(loadingIcon,loading);
  
  
  return (
    <div className='main-color-bg h-[100%] flex'>
      
      <Sidebar />
     
      <div id='main' className='w-[100%] min-h-[100vh] px-4 h-[100%] grid-col-2 flex overflow-scroll overflow-x-hidden flex-wrap flex-col  text-center justify-start items-center'>

        <div className='flex flex-col w-full items-end justify-start p-4'>
        <UserProfileIcon/>

        </div>
        
      
       
        <div className={` mx-auto mx-auto h-[380px] justify-between   mt-12 ${windowWidth<980 ? "block   ":"flex " }`}>
        <div className={` flex mb-4  flex-col  ${windowWidth<980 ? "w-full":"w-2/3 mr-4"}  h-[100%] px-2 py-2  flex justify-center border-4   border-[rgb(180,81,5)] outline outline-4 outline-[rgb(107,55,16)] bg-[#FFC376]`}>
      
          <Mainchart />
        </div>

        <div className={`h-[100%]  ${windowWidth<980 ? "w-full":"w-1/3 ml-4 "} p-auto flex flex-col items-center align-middle self-center border-4 pt-2  border-[rgb(180,81,5)] outline outline-4 outline-[rgb(107,55,16)] bg-[#FFC376]`}>
        <h1 className='poppins-semibold mb-4'>Vendas por Categorias </h1>
          <Sectorchart />
        </div>
      </div>
            </div>
      </div>
    
  );
}

export default Analytics;
