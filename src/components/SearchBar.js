import React, { useState } from 'react';
import "./SearchBar.css"

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex justify-between rounded-lg max-h-10 w-80 bg-orange-400 m-4 p-2 shadow-md">
      <input
        className="h-10 rounded-lg w-full bg-orange-400 placeholder-gray-700 focus:outline-none px-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search user..."
      />
      <button onClick={handleSearch} className="ml-2 h-10 bg-orange-700 text-white px-4 rounded">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
