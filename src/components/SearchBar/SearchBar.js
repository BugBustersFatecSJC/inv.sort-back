import React, { useState } from 'react';
import "./SearchBar.css"

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex justify-between rounded-lg max-h-6 w-56 bg-[rgb(221,160,89)] m-2">
      <input
        className="h-6 rounded-lg w-[190px] bg-[rgb(221,160,89)] m-0 text-white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Procure aqui"
      />
      <button onClick={handleSearch} className="vt323-regular bg-[rgb(62,25,0)] text-[rgb(244,189,118)] border-4 border-black rounded w-20 px-2 py-1 flex items-center justify-center">
        Search
      </button>
    </div>
  );
};

export default SearchBar;