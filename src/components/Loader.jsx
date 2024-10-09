import { useEffect, useRef, useState } from "react"
import gsap from "gsap";
import { useLocation } from "react-router-dom";

function Loader() {

    const loadBkg = useRef(null);
    const logoCont = useRef(null);
    const location = useLocation();

    //finta animazione di caricamento della pagina-> ogni volta che cambia location(url) nelle dipendenze viene rieseguita l'animazione
    const handleLoad = () => {
        setTimeout(() => {
            // Imposta l'opacità a 1 prima di iniziare l'animazione
            if (logoCont.current && loadBkg.current) {
                // Animazione di scomparsa
                gsap.to(logoCont.current, { opacity: 0, duration: 0.1 });
                gsap.to(loadBkg.current, { opacity: 0, duration: 0.1 });
            }
        }, 1500);
    };

    useEffect(() => {
        // Chiama handleLoad ogni volta che la posizione cambia
        handleLoad();
    }, [location]); // Esegui ogni volta che cambia la posizione



    return (
        <>
         
            <div ref={loadBkg} className="loading">
                <div ref={logoCont} className="logoCont">
                    <a href="/" className="alieno"></a>
                </div>
                {/* <p className="loaderText">loading</p>*/}
            </div>
 
        </>
    )
}


export default Loader;