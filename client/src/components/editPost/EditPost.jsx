import "./EditPost.css";
import { useState, useEffect } from 'react';

function EditPost({deletePost}) {
    const [showOptions, setshowOptions] = useState(false);

    function toggleShowOptions() {
        setshowOptions(prevState => !prevState);
    }

    return (
        <>
            <i 
                className="fa-solid fa-ellipsis options-icon"
                onClick={toggleShowOptions}
            >
            </i>
            { showOptions && 
                
                <div className="options-container">
                    <i className="fa-solid fa-caret-up caret-icon"></i>
                    <div className="option edit-option">
                        <i className="fa-solid fa-pen edit-icon"></i>
                        <p>Edit Post</p>
                    </div>
                    <div 
                        className="option delete-option"
                        onClick={deletePost}
                    >
                        <i className="fa-solid fa-trash trash-icon"></i>
                        <p>Delete Post</p>
                    </div>
                    
                </div>
            }

        </>
    );


}


export default EditPost;
