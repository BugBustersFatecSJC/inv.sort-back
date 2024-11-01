import React from 'react'
import { useState, useEffect } from 'react'



function DropdownButtons({ options = [],type, label, onChange, disabled = false }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  })
  return (
    <div className=' ml-4'>
      <select
        className={`${windowWidth <750?'w-[6rem]': 'w-[100px]'} poppins-semibold border-4 rounded border-[#B45105] bg-[#FFC376]`}
        name="dropdown"
        id="filtrodrop"
        onChange={onChange}
        disabled={disabled}
      >
        <option value="null">{label}</option>
        {options.map((option) => (
          <option key={option[`${type}_id`]} value={option[`${type}_id`]}>
            {option[`${type}_name`]}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DropdownButtons
