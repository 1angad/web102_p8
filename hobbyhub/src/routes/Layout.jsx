import { Outlet, Link } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import { useState } from "react";

const Layout = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Call the onSearch prop with the query
  };

  return (
    <>
      <div className="navbar">
        <h2>HistoryHub</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Link to="/">Home</Link>
        <Link to="/new">Create New Post</Link>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
