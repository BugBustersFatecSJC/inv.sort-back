import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import UserProfileIcon from '../../components/UserProfileIcon/UserProfileIcon'
import Field from '../../components/Field/Field'
import SendButton from '../../components/SendButton/SendButton'

function MainPage() {
  return (
    <div className='main-color-bg flex'>
      <Sidebar />

      <div className='w-full flex flex-col items-center'>
        <div className='flex flex-col w-full items-end justify-start p-4'>
          <UserProfileIcon />
        </div>
        
        <div className='w-full flex justify-center'>
          <SendButton text="ENVIAR" />
        </div>
      </div>
    </div>
  )
}

export default MainPage
