import React from 'react'
import Watermark from '../Watermark/Watermark'
import CategoryButtons from '../../components/CategoryButtons/CategoryButtons';



function Sidebar(props) {
  return (
    <div className="relative flex flex-col bg-clip-border alt-color-bg min-h-screen w-full max-w-[20rem] py-4">
      <img src="img/logo_invsort.svg" className="w-[30%] mx-auto" alt=""/>
      {props.content}
      <div className="mt-[250px]"> 
        <CategoryButtons />
      </div>
      
      <div className='absolute right-[.5rem] bottom-0 flex w-full justify-center'>
        <Watermark />
      </div>
    </div>
  )
}

export default Sidebar
