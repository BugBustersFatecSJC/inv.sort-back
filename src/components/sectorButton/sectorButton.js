import React from 'react';

const SectorButton = ({ selectedValue, setSelectedValue},data) => {
 
  return (
    <select
      className="w-36 poppins-semibold border-4 rounded border-[#B45105] bg-[#FFC376]"
      onChange={setSelectedValue()}
      name="visualização"
      id="filtrodrop"
       // Set the value of the select element
    >
      {Object.keys(data).forEach((element) => {
        return (
          <option key={element} value={selectedValue}>
            {element}
          </option>
        );
      })}
    </select>
  );
};

export default SectorButton;