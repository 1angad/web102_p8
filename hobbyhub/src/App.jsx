import { useState, useEffect } from 'react';
import './App.css';
import Post from './Components/Post.jsx';
import { supabase } from './client.js';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import Layout from "./routes/Layout.jsx";
import Loading from "./Components/Loading.jsx";

function App() {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  useEffect(() => {
    fetchPosts();
  }, [query, sortOrder]); // Trigger fetchPosts when the query or sortOrder changes

  const fetchPosts = async () => {
    let { data } = await supabase.from('posts').select();
  
    // Filter posts based on the search query
    if (query) {
      data = data.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
    }
  
    // Apply sorting if needed
    if (sortOrder === 'upvotes') {
      data.sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortOrder === 'date') {
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  
    setPosts(data);
  };

  useEffect(() => {
    // Apply sorting if needed
    if (sortOrder === 'upvotes') {
      setPosts((prevPosts) => [...prevPosts].sort((a, b) => b.upvotes - a.upvotes));
    } else if (sortOrder === 'date') {
      setPosts((prevPosts) => [...prevPosts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    }
  }, [sortOrder]);

  const sortByUpvotes = () => {
    setSortOrder((prevOrder) => (prevOrder === 'upvotes' ? null : 'upvotes'));
  };

  const sortByDate = () => {
    setSortOrder((prevOrder) => (prevOrder === 'date' ? null : 'date'));
  };

  return (
    <>
      <Layout onSearch={handleSearch} />
      
      {posts && posts.length > 0 ? ( 
        <>
        <div className='sort'>
          Order by: &emsp;
          <button id="upvotes" onClick={sortByUpvotes}>
            Most Popular
          </button>
          <button id="date" onClick={sortByDate}>
            Newest
          </button>
        </div>
        <div className="feed">
          {posts.map((post, index) => (
            <Link to={`/post/${post.randid}`} key={index}>
              <Post
                randid={post.randid}
                time={post.created_at}
                title={post.title}
                content={post.content}
                image={post.image}
                upvotes={post.upvotes}
              />
            </Link>
          ))}
        </div>
      </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
