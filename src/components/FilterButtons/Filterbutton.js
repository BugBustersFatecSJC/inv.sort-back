import React from 'react';

const FilterButton = ({ selectedValue, setSelectedValue }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    console.log(newValue); // Log the selected value
  };

  return (
    <select
      className="w-21 poppins-semibold border-4 rounded border-[#B45105] bg-[#FFC376]"
      onChange={handleChange}
      name="visualização"
      id="filtrodrop"
      value={selectedValue} // Set the value of the select element
    >
      <option value="/mensal">Mensal</option>
      <option value="/trimestral">Trimestral</option>
    </select>
  );
};

export default FilterButton;