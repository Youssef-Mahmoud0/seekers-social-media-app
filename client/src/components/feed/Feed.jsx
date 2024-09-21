import { useState, useEffect, useRef } from 'react';
import './Feed.css';
import Post from '../post/Post';
import { getPostsByPagination, likePost, unlikePost, deletePost, updatePost } from '../../services/postRequests';
import ComposePost from '../composePost/ComposePost';

import { PostContext } from '../../contexts/PostContext';

function Feed({ mainRef, isUserFeed }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLiking, setIsLiking] = useState(false);
    const scrollTimeoutRef = useRef(null);  // To hold the debounce timeout

    // console.log("Feed rendered");


    useEffect(() => {
        async function fetchPosts() {
            if (!hasMore) return; // Prevent multiple fetches

            const postsData = await getPostsByPagination(page, 5, isUserFeed);
            const { posts, nextPage } = postsData;
            console.log(posts);
            // console.log(posts);
            setPosts(prevPosts => [...prevPosts, ...posts]);

            if (!nextPage) setHasMore(false);

        }

        fetchPosts();

    }, [page, isUserFeed]);

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
                return post.postId === postId ? { ...post, likersCount: newLikersCount, isLiked: !isLiked } : post;
            }));
        } catch (error) {
            console.log("error from toggleLike: ", error);
        } finally {
            setIsLiking(false);
        }
    }

    // track the current scroll position

    useEffect(() => {
        const scrollTracker = mainRef.current;

        const handleScroll = () => {

            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current); // Clear previous timeout

            scrollTimeoutRef.current = setTimeout(() => {
                // 7 4                         // 230                                  // 300px           
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

        } catch (error) {
            console.log("error from deletePost: ", error);
        }
    }

    function handleAddPost(newPost) {
        console.log("This is the new Post", newPost);

        setPosts(prevPosts => [newPost, ...prevPosts]);
    }

    async function handleUpdatePost(postId, content, mediaFiles) {
        console.log("This is the updated Post", postId, content, mediaFiles);
        const updatedPost = await updatePost(postId, content, mediaFiles);
        setPosts(prevPosts => prevPosts.map(post => {
            return post.postId === postId ? updatedPost : post;
        }));

    }

    
    return (
        <PostContext.Provider value={{ handleUpdatePost }}>

            <section className='feed-container'>
                <ComposePost handleAddPost={handleAddPost} />
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
        </PostContext.Provider>
    );

}

export default Feed;