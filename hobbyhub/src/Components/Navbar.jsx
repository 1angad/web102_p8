import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Call the onSearch prop with the query
  };

  return (
    <>
      
    </>
  );
};

export default Navbar;
