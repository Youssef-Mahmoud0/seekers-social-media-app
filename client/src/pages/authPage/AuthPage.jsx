import LoginForm from "../../components/loginForm/LoginForm";
import SignupForm from "../../components/signupForm/SignupForm";
import TextRevealAnimation from "../../components/animation/TextRevealAnimation";
import "./AuthPage.css";

import { useState } from "react";


function LoginPage() {
    const [showSignup, setShowSignup] = useState(false);

    function toggleShowSignup() {
        setShowSignup(prevShowSignup => !prevShowSignup);
    }


    return (
        <div className="login-container">
            <div className="login-page">
                <div className="login-image-overlay">
                    <img src="./1.jpg" alt="login" className="login-image" />
                    
                    <TextRevealAnimation className="text-reveal-animation"/>
                </div>
                <LoginForm toggleShowSignup={toggleShowSignup} />
            </div>
            {showSignup && <SignupForm toggleShowSignup={toggleShowSignup} />}
        </div>
    );
}

export default LoginPage;
