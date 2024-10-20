import React from 'react'

function Select(props) {
  return (
    <div className='my-2 w-full'>
        <select name={props.name} id={props.id} onChange={props.onChange} className='w-full py-[7px] px-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out'>
            {props.children}
        </select>
    </div>
  )
}

export default Select
