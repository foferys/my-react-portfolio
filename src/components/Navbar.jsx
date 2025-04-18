import { Link, useLocation } from 'react-router-dom';
import fofeCover from '../assets/logo_fofeys.png';
import { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import catLogo from "../assets/Logo-Cat.white.svg";
import { ClickTermCatContext } from '../store/ClickTermCatProvider';

//(page3d) indica true o false che viene passato dal componente iniziale e decide giu cosa mostrare col ternario
function Navbar({page3d}) {

    const location = useLocation();
    //se sono nella pagina principale metto lo sfondo nero altrimenti non si vede vene
    useEffect(() => {
        if(location.pathname == "/") {
            document.querySelector("body").classList.remove("whiteBG");
            document.querySelector("body").classList.add("blackBG")
        }
    }, [location])

    const [currentTime, setCurrentTime] = useState("");
    
    const handleHome = () => {
        const headerElement = document.querySelector('#header');
        if(location.pathname == "/") {
            if (headerElement) {
                window.scrollTo({
                    top: headerElement.offsetTop,
                    behavior: 'smooth'
                });
            }
            
        }
    }


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
        
       

        //animazione icona gatto
        useEffect(() => {
            if(location.pathname === "/") { //per evitare avvisi in console se mi sposto di pagina

                setInterval(() => {
                    gsap.to(catlogo.current, {
                        x: Math.round(Math.random() * 10),  // Spostamento casuale orizzontale
                        y: Math.round(Math.random() * 10),  // Spostamento casuale verticale
                        duration: 0.1,  // Durata breve
                        repeat: 3,  // Numero di vibrazioni
                        yoyo: true,  // Ritorna alla posizione originale
                        ease: "power1.inOut",  // Easing per shake fluido
                    });
                }, 4000);
            }
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

    // USO DEL contesto ClickTermCat creato nello store in ClickTermCatProvider.jsx, che conteinte i due componenti nel quale è usato lo stato 
    //implementato in  ClickTermCat -> questo lo uso giu per mostrare il gatto se non si è ancora cliccato sul terminalino
    const {terminalClicked} = useContext(ClickTermCatContext);

    useEffect(() => {
        const thbox = document.querySelector(".third-box");
        if(thbox)  {

            gsap.to(catText.current,{
                opacity:0,
                ease: "Power2.easeInOut",
                scrollTrigger: {
                    trigger: thbox,
                    scrub: true,
                }
        
            }) 
        }
    }) //senza dipendenze perché funziona sempre durante il ciclo di vita del componente


    return (
        <>
      
        {/* indicazioni locali */}
        <div className="localInfo">
            {
                currentTime?
                <span>
                    {(!page3d)?
                    <>
                    <div>
                        <p className="m-0">{`~ Cosenza, `} {`${currentTime.split(" ")[1]} [IT]`}</p>
                        <p className="m-0 data">{`~ ${currentTime.split(" ")[0]}`}</p>
                    </div>
                
                    <span ref={catText} className="lovecats text-white">
                        [Adoro i gatti. Scrivi nel piccolo terminale in basso <i className="uil uil-arrow-down"></i> ] <br />

                        {(terminalClicked == "no")?

                            <div>
                                <img ref={catlogo} className='cat-logo mx-2' src={catLogo} alt="" />
                            </div>
                            :
                            ""
                        }
                        

                    </span>
                    </>
                    : 
                    ""
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
    
                <Link className="header_logo navbar-brand" to={"/"}>
                    <img className="logo" src={fofeCover} alt="" />
                </Link>
                


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
                                <Link className="nav-link active" aria-current="page" onClick={handleHome} to={"/"}>Home</Link>
                            </li>
                            <li><a href="#siti">Projects</a></li>
                            {/* <li><a href="#3d">3D</a></li> */}

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