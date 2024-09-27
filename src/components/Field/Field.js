import React from 'react'
import './Field.css'

function Field(props) {
  return (
    <div className='my-2 w-full'>
        <input className='w-full p-[4px] shadow-lg quinteral-color-bg rounded font-pixel text-xl' type={props.type} placeholder={props.placeholder} name={props.name} />
    </div>
  )
}

export default Field