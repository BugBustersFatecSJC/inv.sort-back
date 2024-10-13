import {useState} from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import UserProfileIcon from '../../components/UserProfileIcon/UserProfileIcon';
import Loading from '../../components/Loading/Loading';
import CategoryButtons from '../../components/CategoryButtons/CategoryButtons';
import Mainchart from '../../components/MainChart/Mainchart';
import Sectorchart from '../../components/Sectorchart/Sectorchart'
import Cardsanalytics from '../../components/Cardsanlaytics/Cardsanalytics';
import Analyticsboard from '../../components/Analyticsboard/Analyticsboard';
function Analytics(props) {
  const [loading, setloading] = useState(false);
  const loadingIcon = () => {
    setloading((prevLoading) => !prevLoading);
  };
  
  return (
    <div className='main-color-bg flex'>
      
      <Sidebar />
     
      <div id='main' className='w-full px-12 h-[100%] flex overflow-scroll overflow-x-hidden flex-wrap flex-col items-center'>
      
        <div className='flex flex-col w-full items-end justify-start p-4'>
          <UserProfileIcon />
        </div>
        
        <Cardsanalytics/>
       
        <div className='w-[100%] h-[250px] overflow-x-hidden flex mx-auto  justify-center text-center align-center  '>
            <div className='h-[100%] px-2 py-2 flex items-center self-center justify-between w-[100%] border-4 rounded border-[#B45105] bg-[#FFC376]'>
              <Mainchart />
              </div>       
              

        </div>
        
          <div className='min-h-[50px] flex'>
            
          </div>

        <div className='h-[100%]  mx-12 px-2 py-2 flex items-center self-center justify-between w-[100%] border-4 rounded border-[#B45105] bg-[#FFC376]'>
        <Sectorchart />
        
          </div>  
        </div>
      </div>
    
  );
}

export default Analytics;
