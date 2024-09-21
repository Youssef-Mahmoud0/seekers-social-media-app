
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


export async function getPostCommentsByPagination(postId, page, limit) {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const response = await fetch(`${baseUrl}/posts/${postId}/comments?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('token')}`,
        },
    });

    const data = await response.json();
    console.log("this is the data we want to get: ", data);
    return data;    

}