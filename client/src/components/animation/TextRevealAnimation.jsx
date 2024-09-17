import { useState, useEffect } from "react";


function TextRevealAnimation({className}) {
    const [displayedText, setDisplayedText] = useState("_"); // Initially just underscore
    const [currentIndex, setCurrentIndex] = useState(0); // Start from the first character
    const text = "Seekers"

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayedText((prevText) => {
                if (!displayedText.match(text)) {
                    // Alternate between showing character and character + underscore
                    if (prevText.endsWith("_")) {
                        return text.substring(0, currentIndex + 1); // Show character
                    } else {
                        return text.substring(0, currentIndex + 1) + "_"; // Add underscore
                    }
                } else {
                    clearInterval(interval);
                    return text; // Finish the animation with the full text displayed
                }
            });

            // Move to the next character after showing each pair of letter + underscore
            if (!displayedText.endsWith("_")) {
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }
        }, 350); // Control the speed of the animation

        return () => clearInterval(interval);
    }, [displayedText, currentIndex, text]);

    return <h1 className={`animated-text ${className}`} >{displayedText}</h1>;
};

export default TextRevealAnimation;
