import React from 'react'
import Watermark from '../Watermark/Watermark'
import CategoryButtons from '../../components/CategoryButtons/CategoryButtons';



function Sidebar(props) {
  return (
    <div className="relative flex flex-col bg-clip-border alt-color-bg min-h-screen w-full max-w-[20rem] py-4">
      <div className=' mb-8  text-center align-middle self-center flex-col  flex-wrap fixed w-full h-full min-h-screen w-full max-w-[20rem] py-4'>
          <div className='text-center align-middle flex justify-center'>
          <img src="img/logo_invsort.svg" className="w-[40%] auto" alt=""/>
          </div>
        {props.content}
        <div className=" fixed text-center m-auto  w-full max-w-[20rem] h-[80%] flex justify-center items-center"> 
          <CategoryButtons />
        </div>
        
        <div className='absolute mb-12 right-[.5rem] bottom-0 flex w-full justify-center'>
          <Watermark />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
