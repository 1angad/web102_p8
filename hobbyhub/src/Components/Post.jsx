import React from "react";
import { Link } from 'react-router-dom'

const Post = ( { randid, time, title, content, image, upvotes } ) => {

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

    return (
        <>
        <div className="post">
            <p>{getTimeDifference(time)}</p>
            <h2>{title}</h2>
            <p>{upvotes} upvotes</p>
        </div>
        </>
    );
}

export default Post;
