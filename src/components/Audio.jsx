import { Howl } from 'howler';
import { useEffect, useRef, useState } from 'react';

function AudioPlayer() {

    const [isPlaying, setIsPlaying] = useState(false);
    const soundRef = useRef(null); // Usa useRef per mantenere l'istanza di Howl

    useEffect(() => {
        // Inizializza Howl solo una volta
        soundRef.current = new Howl({
            src: ['src/assets/audio/john.aac'],
            loop: true,
            volume: 0.3,
            mobileAutoplay: true,
        });

        const linesCont = document.querySelector(".music-lines2");
        const lines = document.querySelectorAll(".line2");

        const handleClick = () => {
            // Controlla se il suono è in riproduzione direttamente dall'istanza di Howl 
            // soundRef.current.playing(): Ora controlliamo direttamente se il suono è in riproduzione tramite soundRef.current.playing(). In questo modo, se il 
            // suono è in riproduzione, lo stoppiamo indipendentemente dallo stato locale di React.
            if (soundRef.current.playing()) {
                soundRef.current.stop(); // Usa stop per fermare la musica
                setIsPlaying(false);
                lines.forEach(line => line.classList.remove("animate2"));
            } else {
                soundRef.current.play();
                setIsPlaying(true);
                lines.forEach(line => line.classList.add("animate2"));
            }
        };

        if (linesCont) {
            linesCont.addEventListener("click", handleClick);
        }

        // Cleanup function to remove event listener
        return () => {
            if (linesCont) {
                linesCont.removeEventListener("click", handleClick);
            }
            // Ferma l'audio se il componente viene smontato
            if (soundRef.current) {
                soundRef.current.stop();
            }
        };
    }, []); //Se dovessi aggiungere isPlaying nell'array delle dipendenze, l'effetto verrebbe rieseguito ogni volta che isPlaying cambia. Tuttavia, in questo caso non è necessario, poiché 
    //l'unica cosa che dipende da isPlaying è la logica del click handler, che viene eseguita al click, non su ogni render. Ecco il motivo per cui l'array delle dipendenze è vuoto.

    return (
        <>
            <a>
                <div className="music-lines2" title="attiva/disattiva audio">
                    <div className="line2"></div>
                    <div className="line2"></div>
                    <div className="line2"></div>
                    <div className="line2"></div>
                    <div className="line2"></div>
                    <div className="audio">audio</div>
                </div>
            </a>
        </>
    );
}

export default AudioPlayer;
