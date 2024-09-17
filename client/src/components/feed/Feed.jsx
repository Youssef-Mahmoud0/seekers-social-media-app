import {useState, useEffect, useRef} from 'react';
import './Feed.css';
import Post from '../post/Post';
import { getPostsByPagination, likePost, unlikePost, deletePost } from '../../services/postRequests';


function Feed({ mainRef }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLiking, setIsLiking] = useState(false);  
    const scrollTimeoutRef = useRef(null);  // To hold the debounce timeout

    console.log("Feed rendered");


    useEffect(() => {
        async function fetchPosts() {
            if (!hasMore) return; // Prevent multiple fetches

            const postsData = await getPostsByPagination(page, 5);
            const { posts, nextPage } = postsData;
            // console.log(posts);
            setPosts(prevPosts => [...prevPosts, ...posts]);

            if (!nextPage) setHasMore(false);
            
        }

        fetchPosts();
        
    }, [page]);

    async function toggleLike(postId, isLiked) {
        if (isLiking) return;

        setIsLiking(true);

        try {
            let newLikersCount;
            if (isLiked)
                newLikersCount = await unlikePost(postId);
            else 
                newLikersCount = await likePost(postId);
            setPosts(prevPosts => prevPosts.map(post => {
                return post.postId === postId ? {...post, likersCount: newLikersCount, isLiked: !isLiked} : post;
            }));
        }catch(error){
            console.log("error from toggleLike: ", error);
        }finally{
            setIsLiking(false);
        }
    }

    // track the current scroll position

    useEffect(() => {
        const scrollTracker = mainRef.current;
        
        const handleScroll = () => { 

            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current); // Clear previous timeout

            scrollTimeoutRef.current = setTimeout(() => {
                if (scrollTracker.scrollTop + scrollTracker.clientHeight >= scrollTracker.scrollHeight - 250 && hasMore) 
                    setPage(prevPage => prevPage + 1);        
            }, 50); // 50ms debounce delay
        };
        
    
        scrollTracker.addEventListener('scroll', handleScroll);
    
        return () => scrollTracker.removeEventListener('scroll', handleScroll);
        
    }, [hasMore]);
    

    async function handleDeletePost(postId) {
        try {
            await deletePost(postId);
            setPosts(prevPosts => prevPosts.filter(post => post.postId !== postId));

        }catch(error){
            console.log("error from deletePost: ", error);
        }
    }


    
    return(
        <section className='feed-container'>
            {posts.map(post => 
                <Post 
                    key={post.postId} 
                    post={post} 
                    toggleLike={toggleLike} 
                    isLiking={isLiking}
                    deletePost={handleDeletePost}
                />
            )}
            {!hasMore && <p>No more posts to load.</p>}

        </section>
    );

}

export default Feed;