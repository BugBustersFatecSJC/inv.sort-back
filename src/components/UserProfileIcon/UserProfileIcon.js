import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserProfileIcon() {
  const navigate = useNavigate()
  
  const navigateUserProfile = () => {
    navigate('/profile')
  }
  
  const user = localStorage.getItem("user")
  const jsonUser = JSON.parse(user)
  return (
    <div className='flex items-center'>
      <div className='me-3'> 
        <p className='font-pixel text-2xl'>
          {jsonUser.username}
        </p>
        <p className='font-pixel text-lg'>
          {jsonUser.role}
        </p>
      </div>
      <figure className='bg-white rounded-full w-[4.4rem] h-[4.4rem] cursor-pointer' onClick={navigateUserProfile}>
      
      </figure>
    </div>
  )
}

export default UserProfileIcon
