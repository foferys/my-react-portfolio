import { Link } from "react-router-dom";
import fofeCover from '../assets/logo_fofeys.png';
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

//(page3d) indica true o false che viene passato dal componente iniziale e decide giu cosa mostrare col ternario
function Navbar({page3d}) {

    const [currentTime, setCurrentTime] = useState("");


    // Aggiorna l'ora ogni secondo in base al tempo trascorso
    const getItalianTime = () => {
        const now = new Date();
        const utcOffset = now.getTimezoneOffset() * 60000; // Offset UTC in millisecondi
        const italyOffset = 3600000; // Offset di 1 ora per CET (in millisecondi)

        // Calcola l'ora locale in Italia (somma il CET offset)
        const italianTime = new Date(now.getTime() + utcOffset + italyOffset);
        return italianTime.toISOString().replace('T', ' ').substring(0, 19);
    };

    // Aggiorna l'ora ogni secondo
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(getItalianTime());
        }, 1000);

        return () => clearInterval(interval); // Pulisci l'intervallo quando il componente viene smontato
    }, []);


    const catText = useRef(null);
    useEffect(() => {
        gsap.to(catText.current, {
            opacity:0,
            ease: "Power2.easeInOut",
            scrollTrigger: {
                trigger: ".third-box",
                scrub: true,
            }

        })
    })


    return (
        <>
      
        {/* indicazioni locali */}
        <div className="localInfo">
            {
                currentTime?
                <span>
                    <div>
                        <p className="m-0">{`~ Cosenza, `} {`${currentTime.split(" ")[1]} [IT]`}</p>
                        <p className="m-0 data">{`~ ${currentTime.split(" ")[0]}`}</p>
                    </div>
                    <span ref={catText} className="lovecats text-success">
                        [i also love cats. Tap a word in the little terminal]  <i class="uil uil-corner-right-down"></i>
                    </span>
                </span>
                :
                // caricamento spinner bootstrap se non trova lo stato currentTime
                <div class="spinner-grow spinner-grow-sm" role="status">
                    <span class="sr-only"></span>
                </div>
                
            }
        </div>
        <div className="versionInfo">
            {
                currentTime?
                <div>
                    <p className="m-0">V-002</p>
                </div>
                :
                
                <div class="spinner-grow spinner-grow-sm" role="status">
                    <span class="sr-only"></span>
                </div>

            }
        </div>

        <nav id="header" className="navbar navbar-expand-lg ">
            <div className="container-fluid">
                <a className="header_logo navbar-brand">
                    <Link to={"/"}>
                        <img className="logo" src={fofeCover} alt="" />
                    </Link>
                </a>


                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon navbar-dark"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* (page3d) --- ternario */}
                    {page3d ? (
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/"}>go back</Link>
                            </li>
                        </ul>
                    )
                    : (
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page"><Link to={"/"}>Home</Link></a>
                            </li>
                            <li><a href="#siti">Websites</a></li>
                            <li><a href="#3d">3D</a></li>
                            {/* <li><a href="">Grafica</a></li> */}
                            <li><a href="#footer">Contatti</a></li>
                        </ul>
                    )}

                    
                </div>

                
            </div>
        </nav>
        </>
    )


}

export default Navbar;