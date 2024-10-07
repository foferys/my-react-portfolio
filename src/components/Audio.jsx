import { useContext, useEffect, useRef } from "react";
import { AudioContext } from "../store/AudioContext";
import gsap from "gsap";

function AudioPlayer() {
    // prendo gli elementi passsati da AudioContext.jsx con useContext
    /*Consumatore (Consumer): uso useContext(AudioContext) per accedere ai valori forniti dal Provider in AudioContext.jsx. 
    const { isPlaying, handleClick } = useContext(AudioContext);*/
    const {isPlaying, handleClick } = useContext(AudioContext);
    const audioIcon = useRef(null)

    useEffect(() => {
        gsap.fromTo(audioIcon.current, { 
            opacity: 0 }, { opacity: 1, duration: 2 
        });
        
    } , [])
 
        

    return (
        <a>
            {/* al click richiamo la funzione passata dal context audio in AudioContext.jsx */}
            <div className="music-lines2" title="attiva/disattiva audio" onClick={handleClick} ref={audioIcon}> 
                {/* verfico se è in riproduzione con isPlaying passato dal Context e aggiungo la classe che anima le linee */}
                <div className={`line2 ${isPlaying? "animate2" : ""}`}></div>
                <div className={`line2 ${isPlaying? "animate2" : ""}`}></div>
                <div className={`line2 ${isPlaying? "animate2" : ""}`}></div>
                <div className={`line2 ${isPlaying? "animate2" : ""}`}></div>
                <div className={`line2 ${isPlaying? "animate2" : ""}`}></div>
                <div className="audio">audio</div>
            </div>
        </a>
    );
}

export default AudioPlayer;
