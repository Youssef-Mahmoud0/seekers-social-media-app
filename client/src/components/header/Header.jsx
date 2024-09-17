import { useState } from "react";
import "./Header.css";


function Header() {

    const [profilePicture, setProfilePicture] = useState(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/uploads/profile-pictures/default-profile-picture.png`
    );



    return (
        <header>
            <div className="left-container">

                <img src="./logo.png" alt="logo" className="logo" />
                <i className="fa-solid fa-magnifying-glass search-icon"></i>

            <div>
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search"
                />
            </div>

            </div>
            <div className="right-container">
                <i className="fa-regular fa-bell notification-icon"></i>
                <img src={profilePicture} alt="logo" className="profile-picture" />

            </div>
        </header>
    );
}

export default Header;
