import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client.js";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading.jsx";

const PostInfo = () => {
    const [postDetails, setPostDetails] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const params = useParams();


    const getTimeDifference = (postTime) => {
        const currentTime = new Date();
        const timeDifference = currentTime - new Date(postTime); // in milliseconds
      
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
      
        if (weeks > 0) {
          return `Posted ${weeks} week(s) ago`;
        } else if (days > 0) {
          return `Posted ${days} day(s) ago`;
        } else if (hours > 0) {
          return `Posted ${hours} hour${hours === 1 ? "" : "s"} ago`;
        } else {
          return `Posted less than an hour ago`;
        }
      };

    useEffect(() => {
        const fetchDetails = async () => {
            const { data } = await supabase
              .from('posts')
              .select()
              .eq('randid', params.randid);
          
              setPostDetails(data[0]);
            console.log(data[0]);
          }
        fetchDetails().catch(console.error);
        fetchComments();
      }
      ,[]);

      async function handleUpvote() {
        await supabase
          .from('posts')
          .update({ upvotes: postDetails.upvotes + 1 })
          .eq('randid', params.randid);
      
        const { data } = await supabase
          .from('posts')
          .select()
          .eq('randid', params.randid);
      
        setPostDetails(data[0]);
      }

    async function deletePost(event) {
    event.preventDefault();
    
    // Delete the comments associated with the post
    const { error: deleteCommentsError } = await supabase
        .from('comments')
        .delete()
        .eq('post_id', params.randid);
    
    if (deleteCommentsError) {
        console.error('Error deleting comments:', deleteCommentsError);
        return;
    }
    
    // Delete the post
    const { error: deletePostError } = await supabase
        .from('posts')
        .delete()
        .eq('randid', params.randid);
    
    if (deletePostError) {
        console.error('Error deleting post:', deletePostError);
        return;
    }
    
    window.location = "/";
    }

    const handleNewCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const fetchComments = async () => {
        try {
          const { data, error } = await supabase
            .from('comments')
            .select()
            .eq('post_id', params.randid); // Replace 'params.uuid' with 'params.randid'
      
          if (error) throw error;
      
          setComments(data || []); // Use an empty array as a fallback
        } catch (error) {
          console.error('Error fetching comments:', error);
          setComments([]); // Use an empty array as a fallback
        }
      };
      
      const handleAddComment = async (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page

        const newCommentObject = { post_id: params.randid, content: newComment };

        const { error } = await supabase
            .from('comments')
            .insert([newCommentObject]);

        if (error) {
            console.error('Error adding comment:', error);
            return;
        }

        setComments([...comments, newCommentObject]);
        setNewComment('');
    };

    return (
        <>
            <div className="post">
                {postDetails === null ? (
                  <Loading />
                ) : (
                <>
                    <p>{getTimeDifference()}</p>
                    <h2>{postDetails.title}</h2>
                    <p>{postDetails.content}</p>
                    {postDetails.image === "" ? (null) : ( <img src={postDetails.image} alt="Post Picture" width="500px"/>)
                    }
                    <div className="interact">
                        <div className="upvotes">
                            <button onClick={handleUpvote}>
                                <img src="https://cdn-icons-png.flaticon.com/512/25/25297.png" alt="upvote" width="30px"/>
                            </button>
                            <p>{postDetails.upvotes} upvotes</p>
                        </div>
                        <div className="icons">
                            <Link to={`/edit/${postDetails.randid}`}>
                                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" alt="edit" width="30px"/>
                            </Link>
                            <button><img src="https://cdn-icons-png.flaticon.com/512/11846/11846002.png" alt="delete" width="30px" onClick={deletePost}/></button>
                        </div>
                    </div>
                    <div className="comments">
                        <ul style={{ listStyleType: 'dash' }}>
                            {comments.map((comment, index) => (
                            <li key={index}>{comment.content}</li>
                            ))}
                        </ul>
                        <form onSubmit={handleAddComment}>
                            <input
                            type="text"
                            value={newComment}
                            onChange={handleNewCommentChange}
                            placeholder="Leave a comment..."
                            />
                        </form>
                    </div>
                </>
                )}
            </div>
        </>
    );  
}

export default PostInfo;