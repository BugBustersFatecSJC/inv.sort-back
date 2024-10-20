import React from 'react';

const sectorButton = ({ selectedValue, setSelectedValue }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    console.log(newValue); // Log the selected value
  };
  const ano = new Date().getFullYear();
  return (
    <select
      className="w-36 poppins-semibold border-4 rounded border-[#B45105] bg-[#FFC376]"
      onChange={handleChange}
      name="visualização"
      id="filtrodrop"
      value={selectedValue} // Set the value of the select element
    >
      <option value={ano}>{ano}</option>
      <option value={ano-1}>{ano-1}</option>
      <option value={ano-2}>{ano-2}</option>
      <option value={ano-3}>{ano-3}</option>
    </select>
  );
};

export default sectorButton;