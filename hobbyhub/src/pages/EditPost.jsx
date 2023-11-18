import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import { Outlet } from "react-router-dom";

const PostInfo = () => {
    const params = useParams();
    const [post, setPost] = useState({
        title: '',
        content: '',
        image: '',
      });

    useEffect(() => {
        const fetchDetails = async () => {
            const { data } = await supabase
              .from('posts')
              .select()
              .eq('randid', params.randid);
          
              setPost(data[0]);
            console.log(data[0]);
          }
        fetchDetails().catch(console.error);
      }
      ,[]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => {
            return {
            ...prev,
            [name]: value,
            };
        });
    };

    // chnage this
    const updatePost = async (event) => {
        event.preventDefault();
    
        await supabase
          .from("posts")
          .update({
            title: post.title,
            content: post.content,
            image: post.image,
          })
          .eq("randid", params.randid);
    
        window.location = "/";
      };

    return (
        <>
            <div className='container'>
            <form onSubmit={updatePost}>
                <input type="text" name="title" id="title" value={post.title} onChange={handleChange} />
                <textarea name="content" id="content" cols="30" rows="10" value={post.content} onChange={handleChange}></textarea>
                <input type="text" name="image" id="image" value={post.image} onChange={handleChange}/>
                <input type="submit" value="Submit" onClick={updatePost} />
            </form>
            <Outlet />
        </div>  
        </>
    )
}

export default PostInfo;
