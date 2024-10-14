import { current } from "@reduxjs/toolkit";
import img1 from "../img/ecommerce.jpg";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import video1 from '../assets/video/code.mp4';
import codeboy from '../assets/video/codeboy.mp4';
import { useLocation, useParams } from "react-router-dom";
import mywallet from "../img/mysmartwallet.jpg"

gsap.registerPlugin(ScrollTrigger);

function OrizScrollingPage() {

    const sezHorzScroll = useRef(null);
    const scrollCont = useRef(null);

    const location = useLocation(); // Ottieni l'oggetto location
    const queryParams = new URLSearchParams(location.search); // Crea un oggetto URLSearchParams
    const site = queryParams.get('site'); // Recupera il valore della chiave "site"
    console.log(site)
    
    useEffect(() => {
        if (sezHorzScroll.current && scrollCont.current) {

            const tl = gsap.timeline({paused:true}) 
            // const tl = gsap.timeline({
            //     scrollTrigger: {
            //       trigger: sezHorzScroll.current,
            //       start: "center center",
            //       // end: "+=4000", // Puoi definire la fine se necessario
            //       scrub: 1,
            //       pin: true,
            //       markers: true
            //     }
            //   }); //uguale a questa sotto
            let isMobile = window.innerWidth <= 768; // Puoi cambiare il breakpoint secondo necessità
            console.log(isMobile)

            ScrollTrigger.create({
                animation: tl,
                trigger: sezHorzScroll.current,
                start: "top top",
                end: () => "+=4000", // Diversi valori di fine per mobile e desktop
                scrub: 1,
                pin: true,
                // markers: true
            });
            
            tl.to(sezHorzScroll.current, {
                x: isMobile 
                    ? scrollCont.current.clientWidth - sezHorzScroll.current.clientWidth * 1.1  //Stai sottraendo la metà della larghezza di sezHorzScroll.current.clientWidth.
                    // Questo significa che l'animazione su mobile non scorre l'intera larghezza del contenitore come su desktop, ma solo la metà.
                    : scrollCont.current.clientWidth - sezHorzScroll.current.clientWidth,
                duration: 3
            });
            // .to(".sezhorizScroll >*", {
            //     y:-300,
            //     autoAlpha:0,
            //     duration:0.2
            // })

        }
    
        // Cleanup della timeline e dello ScrollTrigger all'unmount
        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      }, []); // Dipendenza vuota: esegui solo al montaggio

    return (
      
        <section className="horScrollElement">
            <div id="whatIs">
                <h6>E-Commerce</h6>
                <h6>Creative Website Architecture</h6>
                <h6>Back-end Development</h6>
                <h6>WebGl blabla</h6>
            </div>

            <div className="container" ref={scrollCont}>

                <div ref={sezHorzScroll} className="gap-2 sezhorizScroll" >

                    <div className="boxProject" style={{"align-self": "flex-end",}}>
                        <video autoPlay loop src={(site == "myWallet")? codeboy:video1}></video>
                    </div>
                    <div className="boxProject" style={{"align-self": "flex-end",}}>
                        <video autoPlay loop src={video1}></video>
                    </div>
                    <div className="boxProject" style={{"align-self": "flex-end",}}>
                        <video autoPlay loop src={video1}></video>
                    </div>
                    <div className="boxProject" style={{"align-self": "flex-end",}}>
                        <video autoPlay loop src={video1}></video>
                    </div>
                    <div className="boxProject" style={{"align-self": "flex-end",}}>
                        <video autoPlay loop src={video1}></video>
                    </div>
                    <div className="boxProject" style={{"align-self": "flex-end",}}>
                        <video autoPlay loop src={video1}></video>
                    </div>
                    <div className="boxProject" style={{"align-self": "flex-end",}}>
                        <video autoPlay loop src={video1}></video>
                    </div>
                    
                </div>

            </div>
        </section>
     
    )
}

export default OrizScrollingPage;