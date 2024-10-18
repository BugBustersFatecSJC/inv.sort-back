import React from 'react'

function Loading() {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <figure className='w-[3rem]'>
          <img src="img/loading_icon.gif" alt=''/>
      </figure>
      <p className='font-pixel'></p>
    </div>
  )
}

export default Loading