import arrRight from '../img/arrow-right-solid.svg';
import { useEffect, useState} from 'react';


function Footer() {



    //--OBSERVER ANIMAZIONE ALLO SCROLL ---------

    useEffect(() => {

        const elementsToWatch2 = document.querySelectorAll('.watch2');
        
        const callback = (items) => {
            items.forEach((item) => {
                if (item.isIntersecting) {
                    item.target.classList.add('in-page');
                } 
            });
        };

        
        const observer = new IntersectionObserver(callback, { threshold: 0.6 });

        elementsToWatch2.forEach((element) => observer.observe(element));

        // Cleanup dell'observer quando il componente viene smontato
        return () => {
            elementsToWatch2.forEach((element) => observer.unobserve(element));
        };
    }, []); 

    //--fine OBSERVER ANIMAZIONE ALLO SCROLL ---------

    return (
        <>
        
        <footer id="footer">

            <div  id="footBox">
                <p className="watch2 fade-in">NON ASPETTARE OLTRE</p>
                <h2 className="watch2 fade-in">Facciamo il prossimo passo insieme.</h2>

                <a className="watch2 fade-in" href="mailto:gianpieroweno@hotmail.it">
                    <div id="roundBut">

                        <img src={arrRight} alt="" />
                    </div>
                    scrivimi ora.
                </a>
            </div>

            <div id="footerLinks">

                <p id="copy">© 2023 - <b> <a href="https://www.instagram.com/gianpieroferraro.ph/?hl=it" target="_blank">Gianpiero Ferraro</a></b></p>
                <div id="socials">
                    <p><a href="https://www.instagram.com/gianpieroferraro.ph/?hl=it" target="_blank">Instagram </a></p>
                    <p><a href="https://www.linkedin.com/in/gianpiero-ferraro/" target="_blank"> LinkedIn</a></p>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer;