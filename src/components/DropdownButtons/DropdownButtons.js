import React from 'react'

function DropdownButtons({ options = [], label, onChange, disabled = false }) {
  return (
    <div>
      <select
        className="w-36 poppins-semibold border-4 rounded border-[#B45105] bg-[#FFC376]"
        name="dropdown"
        id="filtrodrop"
        onChange={onChange}
        disabled={disabled}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option.category_id || option.product_id} value={option.category_id || option.product_id}>
            {option.category_name || option.product_name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DropdownButtons
