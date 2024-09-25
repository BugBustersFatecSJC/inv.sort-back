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
        className="h-6 rounded-lg w-[190px] bg-[rgb(221,160,89)] m-0"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search user..."
      />
      <button onClick={handleSearch} className="relative h-6 mr-2 bg-[rgb(180,81,5)] text-white px-2 rounded">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
