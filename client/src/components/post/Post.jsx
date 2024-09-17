import {useState, useEffect} from 'react';
import './Post.css';
import EditPost from '../editPost/EditPost';
import ComposePost from '../composePost/ComposePost';

function Post({post , toggleLike, isLiking, deletePost}) {

    const user = post.user;

    function timeAgo(date) {
        const now = new Date();
        const seconds = Math.floor((now - new Date(date)) / 1000);
    
        let interval = Math.floor(seconds / 31536000); // Seconds in a year
        if (interval >= 1) {
            return interval === 1 ? 'a year ago' : `${interval} years ago`;
        }
    
        interval = Math.floor(seconds / 2592000); // Seconds in a month
        if (interval >= 1) {
            return interval === 1 ? 'a month ago' : `${interval} months ago`;
        }
    
        interval = Math.floor(seconds / 86400); // Seconds in a day
        if (interval >= 1) {
            return interval === 1 ? 'a day ago' : `${interval} days ago`;
        }
    
        interval = Math.floor(seconds / 3600); // Seconds in an hour
        if (interval >= 1) {
            return interval === 1 ? 'an hour ago' : `${interval} hours ago`;
        }
    
        interval = Math.floor(seconds / 60); // Seconds in a minute
        if (interval >= 1) {
            return interval === 1 ? 'a minute ago' : `${interval} minutes ago`;
        }
    
        return seconds < 30 ? 'just now' : `${seconds} seconds ago`;
    }

    const timeAgoString = timeAgo(post.createdAt);

    return(
        <div className='post-container'>
            <ComposePost />
            <div className="top-section">
                <img src={`${import.meta.env.VITE_BACKEND_BASE_URL}/uploads/profile-pictures/default-profile-picture.png`} alt="" />
                <div className='text-info'>
                    <h3>{user.firstName + " " + user.lastName}</h3>
                    <p>{timeAgoString}</p>
                </div>

                <EditPost deletePost={() => deletePost(post.postId)}/>
                {/* <i className="fa-solid fa-ellipsis options-icon"></i> */}
            </div>
            <div className="post-content">
                <p>{post.content}</p>
            </div>
            <div className="stats-section">
                { post.likersCount > 0 && 
                    <div className="likes-stats">
                        <img src="./heart-image.svg" alt="" />
                        {/* <i className={post.isLiked ? `fa-solid fa-heart liked` : ''}></i> */}
                        <p>{post.likersCount}</p>
                    </div>
                }
                {  post.commentsCount > 0 &&
                    <div className="comments-stats">
                        <i class="fa-solid fa-comment"></i>
                        <p>{post.commentsCount}</p>
                    </div>
                }
            </div>

            <hr />
            <div className="bottom-section">
                <div 
                    className={`${post.isLiked ? 'liked' : ''}`}
                    onClick={() => !isLiking && toggleLike(post.postId, post.isLiked)}
                    
                >
                    {
                        post.isLiked ? 
                        <img src="./heart-image.svg" alt="" /> :
                        <i className={`fa-regular fa-heart`}></i>
                    }
                    {/* <i className={post.isLiked ? `fa-solid fa-heart` : `fa-regular fa-heart`}></i> */}
                    <p>Love</p>
                </div>
                <div className="comments">
                    <i className="fa-regular fa-comment"></i>
                    <p>Comment</p>
                </div>  
            </div>
            <hr />
            <div className="comment-section">
                <img src={`${import.meta.env.VITE_BACKEND_BASE_URL}/uploads/profile-pictures/default-profile-picture.png`} alt="" />
                <textarea 
                    placeholder="Write a comment..."
                    onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`; // Adjust based on scrollHeight
                    }}
                />
                

            </div>
        </div>
    );

}

export default Post;
