import {useState,useEffect} from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import UserProfileIcon from '../../components/UserProfileIcon/UserProfileIcon';
import Loading from '../../components/Loading/Loading';
import CategoryButtons from '../../components/CategoryButtons/CategoryButtons';
import Mainchart from '../../components/MainChart/Mainchart';
import Sectorchart from '../../components/Sectorchart/Sectorchart'
import Cardsanalytics from '../../components/Cardsanlaytics/Cardsanalytics';
import MainPage from '../MainPage/MainPage'


function Analytics(props) {
  const [loading, setloading] = useState(false);
  const loadingIcon = () => {
    setloading((prevLoading) => !prevLoading);
  };
  
  return (
    <MainPage title="Análise dos itens">
      <Cardsanalytics/>
      
      <div className='w-[100%] h-[100%] mt-12 grid grid-cols-3 gap-6'>
        <div className='col-span-2 flex flex-col  h-[100%] px-2 py-2  flex justify-center border-4 rounded border-[#B45105] bg-[#FFC376]'>
          {/* <h1 className='poppins-semibold'></h1> */}
          <Mainchart />
        </div>

        <div className='h-[100%] col-span-1 px-2 py-2 flex flex-col items-center self-center w-[100%] border-4 rounded border-[#B45105] bg-[#FFC376]'>
        <h1 className='poppins-semibold'>Vendas por Categorias </h1>
          <Sectorchart />
        </div>
      </div>
    </MainPage>     
  );
}

export default Analytics;
