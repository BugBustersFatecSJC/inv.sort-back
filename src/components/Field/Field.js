import React from 'react'
import './Field.css'

function Field(props) {
  return (
    <div className='my-2 w-full'>
        <input className='w-full p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out' type={props.type} placeholder={props.placeholder} name={props.name} onChange={props.onChange} value={props.value} required={props.required} />
    </div>
  )
}

export default Field