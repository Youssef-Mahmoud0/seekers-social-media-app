import Header from "../../components/header/Header";
import Feed from "../../components/feed/Feed";
import { useRef } from 'react';

import './HomePage.css';

function HomePage() {
    const mainRef = useRef(null);
    const isUserFeed = false;


    return (    
        <>
            <Header />
            <main ref={mainRef} className="main-sections-container">
                <Feed mainRef={mainRef} isUserFeed={isUserFeed}/>

            </main>
        </>
    )
}


export default HomePage;