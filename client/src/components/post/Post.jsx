import {useState, useEffect} from 'react';
import './Post.css';
import ".././composePost/ComposePost.css";
import PostOptions from '../postOptions/PostOptions';
import EditPost from '../editPost/EditPost';


function Post({post , toggleLike, isLiking, deletePost}) {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [timeAgoString, setTimeAgoString] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const user = post.user;
    const mediaFiles = post.mediaFiles || [];
    console.log("mediaFiles", mediaFiles);
    useEffect(() => {
        setTimeAgoString( calculateTimeAgo(post.createdAt) );
    }, [])


    function calculateTimeAgo(date) {
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


    // Show the previous image
    function handleShowPrevImage() {
        let newIndex = currentMediaIndex - 1;
        if (newIndex < 0) newIndex = mediaFiles.length - 1;

        setCurrentMediaIndex(newIndex);
    }

    // Show the next image
    function handleShowNextImage() {
        let newIndex = (currentMediaIndex + 1) % mediaFiles.length;
        setCurrentMediaIndex(newIndex);
    }

    function toggleShowEdit() {
        setShowEdit(prevState => !prevState);
    }


    function renderMediaFiles() {
        
        const currentFile = mediaFiles[currentMediaIndex];
        const fileURL = `${import.meta.env.VITE_BACKEND_BASE_URL}/${currentFile.path}`;

        return (
            <>
                <div 
                    className="media-content"
                >
                    {
                        currentFile.mediaType.startsWith("image") ?
                            <img src={fileURL} alt="Selected media" /> :
                            <video src={fileURL} controls />
                    }
                </div>

                {mediaFiles.length > 1 &&
                    <div className="media-control">
                        <i
                            className="fa-solid fa-angle-left left-arrow"
                            onClick={handleShowPrevImage}
                        ></i>
                        <p>{`${currentMediaIndex + 1}/${mediaFiles.length}`}</p>
                        <i
                            className="fa-solid fa-angle-right right-arrow"
                            onClick={handleShowNextImage}
                        ></i>

                    </div>
                }
            </>
        )   
    };

    return(
        <div className='post-container'>
            <div className="top-section">
                <img src={`${import.meta.env.VITE_BACKEND_BASE_URL}/uploads/profile-pictures/default-profile-picture.png`} alt="" />
                <div className='text-info'>
                    <h3>{user.name}</h3>
                    <p>{timeAgoString}</p>
                </div>

                {
                    currentUser.userId === post.userId &&
                    <PostOptions 
                        deletePost={() => deletePost(post.postId)}
                        toggleShowEdit={toggleShowEdit}    
                    />
                }
                {
                    showEdit && 
                    <EditPost 
                        postMedia = {mediaFiles}
                        postContent = {post.content} 
                        postId = {post.postId}
                        toggleShowEdit={toggleShowEdit}
                    />
                }
            </div>
            <div className="post-content">
                <p>{post.content}</p>
            </div>

            {   
                mediaFiles.length > 0 &&
                <div className="media-container">
                    {renderMediaFiles()}
                </div>
                
            }


            <div className="stats-section">
                { post.likersCount > 0 && 
                    <div className="likes-stats">
                        <img src="./heart-image.svg" alt="" />
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
                    <p>Love</p>
                </div>
                <div className="comments">
                    <i className="fa-regular fa-comment"></i>
                    <p>Comment</p>
                </div>  
            </div>
            {/* <hr />
            <div className="comment-section">
                <img src={`${import.meta.env.VITE_BACKEND_BASE_URL}/uploads/profile-pictures/default-profile-picture.png`} alt="" />
                <textarea 
                    placeholder="Write a comment..."
                    onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`; // Adjust based on scrollHeight
                    }}
                />
                

            </div> */}
        </div>
    );

}

export default Post;
