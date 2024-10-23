import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import video1 from '../assets/video/code.mp4';
import codeboy from '../assets/video/codeboy.mp4';
import { useLocation, useParams } from "react-router-dom";
import { progetti } from "../dataprojects/progData";
import { UilExpandFromCorner } from '@iconscout/react-unicons'
import { HoverProvider } from "../store/HoverContext";
import TextHoverEff from "./TextHoverEff";
import { UilDirection } from '@iconscout/react-unicons'

gsap.registerPlugin(ScrollTrigger);

function OrizScrollingPage() {
  
    const location = useLocation(); // Ottieni l'oggetto location

    // id passato nei parametri url dalla home
    const {id} = useParams();
    const progetto = progetti.find(prog => prog.id === parseInt(id));  //-> progetti è la lista importata da progData.js

    const sezHorzScroll = useRef(null);
    const scrollCont = useRef(null);

    
    useEffect(() => {
        if (sezHorzScroll.current && scrollCont.current) {

            const tl = gsap.timeline({paused:true}) 
            let isMobile = window.innerWidth <= 768; // Puoi cambiare il breakpoint secondo necessità
            // console.log(isMobile)

            
            tl.to(sezHorzScroll.current, {
                x: isMobile 
                    ? scrollCont.current.clientWidth - sezHorzScroll.current.clientWidth * 1.1  //Stai sottraendo la metà della larghezza di sezHorzScroll.current.clientWidth.
                    // Questo significa che l'animazione su mobile non scorre l'intera larghezza del contenitore come su desktop, ma solo la metà.
                    : scrollCont.current.clientWidth - sezHorzScroll.current.clientWidth,
                duration: 3,

                scrollTrigger: {
                    trigger: sezHorzScroll.current,
                    start: "top top",
                    end: () => "+=4000", // Diversi valori di fine per mobile e desktop
                    scrub: 1,
                    pin: true,
                    // markers: true

                    /* l'oggetto self all'interno del callback onUpdate rappresenta il contesto corrente del trigger, che contiene 
                    informazioni utili riguardo allo stato dello scroll, la direzione, e altro. self è un oggetto fornito da ScrollTrigger che 
                    contiene informazioni sullo stato corrente del trigger. La proprietà più usata, self.direction, ti dice se lo scroll sta 
                    avvenendo verso il basso/destra o verso l'alto/sinistra.*/
                    onUpdate: (self) => {
                        if (self.direction !== 0) {
                            // Applica un leggero zoom in quando l'utente scorre
                            gsap.to(sezHorzScroll.current, {
                                scale: 1.08, // Effetto zoom in
                                duration: 0.4, // Durata maggiore per maggiore fluidità
                                ease: "power2.out" // Ease più morbido
                            });
                        }
                    
                        // Torna alla dimensione originale quando lo scroll rallenta
                        gsap.to(sezHorzScroll.current, {
                            scale: 1, // Torna alla scala originale
                            duration: 1.2, // Durata ancora più lunga per un effetto smooth
                            // delay: 0.1, // Un piccolo ritardo per non renderlo immediato
                            ease: "power2.out" // Ease fluido per un ritorno più graduale
                        });
                    }
                    
                }

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
            {/* //stampo la lista che ho recuperato sopra */}
            <div id="progTitle" className="z-3">
                <span className="d-flex gap-4">
                    <h2 className="text-uppercase">{progetto.name}</h2>
                    <a id="goToProjectIcon" className="text-orange p-0" href={progetto.href} target="_blank">
                         
                    </a>
                </span>
                <p>{progetto.date}</p>

                {/* <a ref={hovText} class="toHov" href="https://iconscout.com/unicons/free-line-icons/arrows">Allinaword</a> */}

                {/* link creato come context per utilizzarlo con animazione per diversi testi */}
                <div className="externalLinkicon">
                    <HoverProvider>
                        <TextHoverEff text="Visit" goto={progetto.href} /> <UilExpandFromCorner />  
                    </HoverProvider>
                </div>

            </div>
            <div id="whatIs">
                {  
                //stampo la lista che ho recuperato sopra
                progetto.tecs.map((el, index) => {
                    //in React, se utilizzi una funzione senza return esplicito, non restituirà nulla
                    return <h6 key={index}>{el}</h6>
                })}
            </div>
            {/* <div id="desc">
               <p className="text-black">{progetto.desc}</p>
            </div> */}

            

            <div className="container" ref={scrollCont}>

                <div ref={sezHorzScroll} className="gap-2 sezhorizScroll" >

                    { 
                    
                        progetto.imgs.map((img, index) => {
                            return (
                                <div key={index} className="boxProject" >
                                    {img.includes("mp4")?
                                  
                                    <video loop autoPlay muted src={img}></video>
                                   
                                    :
                                    <img key={index} src={img} alt="" />
                                    }

                                    
                                </div>
                            )
                        })
                    }

                </div>

            </div>
        </section>
     
    )
}

export default OrizScrollingPage;