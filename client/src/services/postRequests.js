
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


export const getPostsByPagination = async (page, limit) => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    console.log("page:",page)
    const response = await fetch(`${baseUrl}/posts?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`
        },
    })

    const data = await response.json();
    // console.log(data)
    return data;
}


export const likePost = async (postId) => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const response = await fetch(`${baseUrl}/posts/${postId}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`
        },
    })

    const data = await response.json();    
    console.log(data)
    return data;
}

export const unlikePost = async (postId) => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const response = await fetch(`${baseUrl}/posts/${postId}/like`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`
        },
    })

    const data = await response.json();    
    return data;
}


export const deletePost = async (postId) => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const response = await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`
        },
    })

    if (!response.ok) {
        throw new Error('Failed to delete post');
    }

    const data = await response.json();    
    return data;
}