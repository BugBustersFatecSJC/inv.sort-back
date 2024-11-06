import React from 'react'

function DropdownButtons({ options = [],type, label, onChange, disabled = false }) {

  return (
    <div className=' ml-4'>
      <select
        className="w-36 poppins-semibold border-4 rounded border-[#B45105] bg-[#FFC376]"
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
