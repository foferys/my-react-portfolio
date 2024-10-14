import { createContext, useEffect, useRef, useState } from "react";
import { Howl } from 'howler';
import audioFru from "../assets/audio/john.aac"

// Crea il contesto audio - Utilizzo AudioContext.Provider per avvolgere i componenti che devono avere accesso ai dati del contesto. 
// in fondo, nel return, sto passando lo stato isPlaying e la funzione handleClick come valore del contesto.
export const AudioContext = createContext();

export const AudioProvider = ({children}) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const soundRef = useRef(null); // Usa useRef per mantenere l'istanza di Howl - giu nella funzione handleClick impostiamo a true se non è gia attivo ecc
    

    const handleClick = () => {
        if (soundRef.current.playing()) {
            soundRef.current.pause();
            setIsPlaying(false);
        } else {
            soundRef.current.play();
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        soundRef.current = new Howl({
            src: [audioFru],
            loop: true,
            volume: 0.3,
            mobileAutoplay: true,
        });

        /*Questo è un cleanup function, una funzione di pulizia che viene eseguita quando il componente viene smontato o quando l'effetto viene rieseguito 
        (se l'array delle dipendenze non fosse vuoto).
        È importante rimuovere eventuali risorse non più necessarie per evitare perdite di memoria o comportamenti indesiderati. */
        return () => {
            if (soundRef.current) {
                soundRef.current.stop();
            }
        };
    }, []);

    return (
        // Qui, sto passando lo stato isPlaying e la funzione handleClick come valore del contesto.
        /*Consumatore (Consumer): All'interno di un componente(in questo coso lo faccio in Audio.jsx), posso usare useContext(AudioContext) per accedere ai valori forniti dal Provider. 
        const { isPlaying, handleClick } = useContext(AudioContext);*/
        <AudioContext.Provider value={{ isPlaying, handleClick }}>  
            {children}
        </AudioContext.Provider>
        /*{children} è utilizzato all'interno del Provider per indicare dove i componenti figli (quelli passati come children) devono essere 
        inseriti nella gerarchia del DOM. In questo modo, i componenti all'interno di AudioProvider possono accedere ai dati forniti dal contesto. 
        
        TUTTO QUESTO LO USO NEL MAIN PER AVERe questo elemento in tutta l'app con il context*/
    );
};
