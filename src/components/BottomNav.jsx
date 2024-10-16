import React, { useEffect, useState } from 'react';
import fofeCover from '../assets/logo_fofeys.png';
import arrowup from '../img/arrowUp.svg';
import arrowleft from '../img/arrowLeft.svg';
import { Link, useLocation } from 'react-router-dom';

function BottomNav({page3d}) {
    // Stato per gestire la visibilità e la posizione del menu
    // useState: Gestisce dinamicamente la posizione (bottom) dell'elemento .header2 e .goBack, aggiornando lo stato invece di modificare direttamente lo stile via DOM.
    const [headerBottom, setHeaderBottom] = useState('-60px');
    const [goBackBottom, setGoBackBottom] = useState('-140px');
    const location = useLocation();

    // Funzione per gestire lo scroll
    const handleScroll = () => {
        const scroll = window.pageYOffset;

        if (scroll < 1200) {
            setHeaderBottom('-60px');
        } else {
            setHeaderBottom('37px');
        }

        if (scroll < 2700) {
            setGoBackBottom('-140px');
        } else {
            setGoBackBottom('37px');
        }
    };

    // Effetto per collegare l'evento scroll
    // useEffect per aggiungere un listener all'evento scroll quando il componente è montato, e rimuoverlo quando il componente si smonta, evitando potenziali memory leaks.
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Cleanup dell'evento scroll quando il componente si smonta
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Il secondo parametro [] assicura che l'effetto venga eseguito solo una volta



    return (
        <>
        
        <div className="goBack" style={{ bottom: goBackBottom }}>
            <a onClick={(e) => { //senza metterlo cosi non si sposta
                e.preventDefault();
                    const headerElement = document.querySelector('#header');
                    if (headerElement) {
                        window.scrollTo({
                            top: headerElement.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }}><img src={ (location.pathname == "/project")? arrowleft : arrowup} alt="torna su" />
            </a>
        </div>
        <div className="header2" style={{ bottom: headerBottom }}>
            <div className="header_content">


                <a className="header_logo" href="#header">
                    <img className="logo" src={fofeCover} alt="" />
                </a>
                {page3d ? (
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={"/"} > <b className='goback'>go back...</b></Link>
                        </li>
                    </ul>
                )
                : (
                    <ul className="header_menu">
                        <li><a href="#siti">Projects</a></li>
                        {/* <li><a href="#3d">3D</a></li> */}
                        {/* <li><a href="">Grafica</a></li> */}
                        <li><a href="#footer">Contatti</a></li>
                    </ul>
                )}
               
            </div>
        </div>
        </>

    );
}

export default BottomNav;
