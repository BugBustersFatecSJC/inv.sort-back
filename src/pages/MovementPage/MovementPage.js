import React from 'react'
import ProductTable from '../../components/ProductTable/ProductTable'
import MainPage from '../MainPage/MainPage'


function MovementPage() {
  
  return (
    <MainPage title="Movimentação de produtos">
      <div className='mt-4'>
        <ProductTable/>
      </div>
    </MainPage>
  )
}

export default MovementPage
