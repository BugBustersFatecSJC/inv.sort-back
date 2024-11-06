import React from 'react'
<<<<<<< HEAD
import { useState, useEffect } from 'react'
import api from '../../services/api'



function DropdownButtons({ options = [],type, label, onChange, disabled = false, padrao = true }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [anoantigo, setAnoantigo] = useState([]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  })
  
  const opt =options;
  return (
    <div className=' mx-2 w-full'>
      <select
        className={`${windowWidth >500?'w-[8rem]': 'w-[90%]'} poppins-semibold border-4 rounded border-[#B45105] bg-[#FFC376] animated-placeholder`}
=======

function DropdownButtons({ options = [],type, label, onChange, disabled = false }) {

  return (
    <div className=' ml-4'>
      <select
        className="w-36 poppins-semibold border-4 rounded border-[#B45105] bg-[#FFC376]"
>>>>>>> 1f76bc0f7120bf7f5b9fe98df825ebb54d1e6c90
        name="dropdown"
        id="filtrodrop"
        onChange={onChange}
        disabled={disabled}
<<<<<<< HEAD
        
      >
        {padrao === true ? <option value="null"  >{label}</option> : ''}
        {type === 'ano' ? opt.map((option) => (
          <option key={option} value={option}>{option}</option>
        )) : options.map((option) => (<>
          
          <option key={option[`${type}_id`]} value={option[`${type}_id`]}>
            {option[`${type}_name`]}
          </option>
          </>
=======
      >
        <option value="null">{label}</option>
        {options.map((option) => (
          <option key={option[`${type}_id`]} value={option[`${type}_id`]}>
            {option[`${type}_name`]}
          </option>
>>>>>>> 1f76bc0f7120bf7f5b9fe98df825ebb54d1e6c90
        ))}
      </select>
    </div>
  )
}

export default DropdownButtons
