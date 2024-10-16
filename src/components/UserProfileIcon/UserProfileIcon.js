import React from 'react'

function UserProfileIcon() {
  
  const user = localStorage.getItem("user")
  const jsonUser = JSON.parse(user)
  return (
    <div className='flex items-center'>
        <p className='font-pixel text-xl me-3'>
            {jsonUser.username}
        </p>
        <figure className='bg-white rounded-full w-[4rem] h-[4rem]'>
        
        </figure>
    </div>
  )
}

export default UserProfileIcon
