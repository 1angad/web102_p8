import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import Layout from "./routes/Layout.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import PostInfo from "./pages/PostInfo.jsx";
import EditPost from "./pages/EditPost.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/" element={<Layout />}>
          <Route path="/new" element={<CreatePost />} />
          <Route path = "/post/:randid" element = {<PostInfo />} />
          <Route path = "/edit/:randid" element = {<EditPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
