import { useEffect, useRef } from 'react';

import Header from "../../components/header/Header";
import Feed from "../../components/feed/Feed";
import { getWebSocket } from '../../webSocket';

import './HomePage.css';

function HomePage() {
    const mainRef = useRef(null);
    const isUserFeed = false;

    useEffect(() => {
        // const ws = getWebSocket(JSON.parse(localStorage.getItem('user')).userId);
    }, []);



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