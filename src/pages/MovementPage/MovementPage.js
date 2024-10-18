import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import UserProfileIcon from '../../components/UserProfileIcon/UserProfileIcon';
import ProductTable from '../../components/ProductTable/ProductTable';
import MainPage from '../MainPage/MainPage';


function MovementPage(props) {
  
  return (
    <MainPage title="Movimentação de produtos">
      <div className='mt-4'>
        <ProductTable/>
      </div>
    </MainPage>
  );
}

export default MovementPage;
