import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { supabase } from '../client.js';

const CreatePost = () => {

    const [post, setPost] = useState({title: "", content: "", image: ""})

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPost = post;
        console.log(newPost);

        const { error } = await supabase
            .from('posts')
            .insert({title: newPost.title, content: newPost.content, image: newPost.image})
            .select()

        if (error) {
            console.log(error);
        }

        window.location = "/";
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    };

    return (
        <div className='container'>
            <form action="">
                <input type="text" name="title" id="title" placeholder='Title' onChange={handleChange} />
                <textarea name="content" id="content" cols="30" rows="10" placeholder='Content (Optional)' onChange={handleChange}></textarea>
                <input type="text" name="image" id="image" placeholder='Image URL (Optional)' onChange={handleChange}/>
                <input type="submit" value="Submit" onClick={handleSubmit} />
            </form>
            <Outlet />
        </div>
    )
}

export default CreatePost;