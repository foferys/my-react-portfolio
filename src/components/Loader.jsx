import { useEffect, useRef, useState } from "react"



function Loader() {

    // uso le ref per gli elementi
    const loadBkg = useRef(null);
    const logoCont = useRef(null);

    const [loaded, setLoaded] = useState(false);
    
    useEffect(() =>{

        const handleLoad = () => {
            setTimeout(() => {
                if (logoCont.current && loadBkg.current) {
                    logoCont.current.style.opacity = 0;
                    loadBkg.current.style.opacity = 0;
                }
                setTimeout(() => {
                    setLoaded(true);
                }, 1000);
            }, 1500);
        };

        window.addEventListener("load", handleLoad);
        
        /*In React, quando utilizzi useEffect per aggiungere un event listener, come in questo caso con window.addEventListener("load", handleLoad),
        è buona pratica rimuovere l'event listener quando il componente si smonta. Se non lo fai, possono verificarsi delle situazioni di memory leak */
        return () =>{ 
            window.removeEventListener("load", handleLoad)
        };

    }, []);




    return (
        <>
         
            <div ref={loadBkg} class="loading">
                <div ref={logoCont} class="logoCont">
                    <a href="/" class="alieno"></a>
                </div>
                {/* <p className="loaderText">loading</p>*/}
            </div>
 
        </>
    )
}


export default Loader;