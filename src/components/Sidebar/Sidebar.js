import React from 'react'
import Watermark from '../Watermark/Watermark'

function Sidebar(props) {
  return (
    <div className="relative flex flex-col bg-clip-border alt-color-bg h-screen w-full max-w-[20rem] p-4">
        <img src="img/logo_invsort.svg" class="w-[30%] mx-auto" alt=""/>
        {props.content}

        <div className='absolute right-[.5rem] bottom-0 flex w-full justify-center'>
            <Watermark />
        </div>
    </div>
  )
}

export default Sidebar
