import { Link } from 'react-router-dom';
import fofeCover from '../assets/logo_fofeys.png';
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import catLogo from "../assets/Logo-Cat.white.svg";

//(page3d) indica true o false che viene passato dal componente iniziale e decide giu cosa mostrare col ternario
function Navbar({page3d}) {

    const [currentTime, setCurrentTime] = useState("");


    // Aggiorna l'ora ogni secondo in base al tempo trascorso
    const getItalianTime = () => {
        return new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' }).replace(',', '');

    };

    // Aggiorna l'ora ogni secondo
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(getItalianTime());
        }, 1000);

        return () => clearInterval(interval); // Pulisci l'intervallo quando il componente viene smontato
    }, []);


    //---testo indicazione terminale gatto
        const catText = useRef(null);
        const header = useRef(null);
        const catlogo = useRef(null);
        const [catAnimating, setCatAnimating] = useState(false);
        
        useEffect(() => {

            gsap.to(catText.current, {
                opacity:0,
                ease: "Power2.easeInOut",
                scrollTrigger: {
                    trigger: ".third-box",
                    scrub: true,
                }
        
            }) 
        }) //senza dipendenze perché funziona sempre durante il ciclo di vita del componente

        //animazione icona gatto
        useEffect(() => {
            setInterval(() => {
                gsap.to(catlogo.current, {
                  x: Math.round(Math.random() * 10),  // Spostamento casuale orizzontale
                  y: Math.round(Math.random() * 10),  // Spostamento casuale verticale
                  duration: 0.1,  // Durata breve
                  repeat: 3,  // Numero di vibrazioni
                  yoyo: true,  // Ritorna alla posizione originale
                  ease: "power1.inOut",  // Easing per shake fluido
                });
            }, 3000);
        },[])

        useEffect(() => {
            gsap.fromTo(header.current, {top: "-75px"}, {
                top: "20px",
                ease: "Power2.easeInOut",
                delay: .6,
                duration:1,
            })
        }, []) //lo fa solo appena si arriva sul componente
    //---fine testo indicazione terminale gatto




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
                    {(!page3d)?
                    
                        <span ref={catText} className="lovecats text-success">
                            [i also love cats. Type in the little terminal]
                            <img ref={catlogo} className='cat-logo mx-2' src={catLogo} alt="" />
                        </span>
                        : ""
                    }
                </span>
                :
                // caricamento spinner bootstrap se non trova lo stato currentTime
                <div className="spinner-grow spinner-grow-sm" role="status">
                    <span className="sr-only"></span>
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
                
                <div className="spinner-grow spinner-grow-sm" role="status">
                    <span className="sr-only"></span>
                </div>

            }
        </div>

        <nav id="header" className="navbar navbar-expand-lg " ref={header}>
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
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-white">
                            <li className="nav-item text-white">
                                <Link to={"/"}><span className="text-white">go back</span></Link>
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