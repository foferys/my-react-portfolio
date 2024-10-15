import { current } from "@reduxjs/toolkit";
import img1 from "../img/ecommerce.jpg";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import video1 from '../assets/video/code.mp4';
import codeboy from '../assets/video/codeboy.mp4';
import { useLocation, useParams } from "react-router-dom";
import mywallet from "../img/mysmartwallet.jpg"

gsap.registerPlugin(ScrollTrigger);

function OrizScrollingPage() {
    //array dei progetti
    const progetti = [

        {
            ref:"myWallet",
            title: "My Smart Wallet",
            tecs: ["E-Commerce","Creative Website Architecture","Back-end Development","WebGl blabla"],
            date: 2023
        }, 
        {
            ref:"olivicola",
            title: "Olive Oil from Europe",
            tecs: ["E-Commerce","Creative Website Architecture","Back-end Development","WebGl blabla"],
            date: 2023
        }
    ]
    const location = useLocation(); // Ottieni l'oggetto location
    const queryParams = new URLSearchParams(location.search); // Crea un oggetto URLSearchParams per avere tutta la stringa dei parametri url

    const site = queryParams.get('site'); // Recupera il valore della chiave "site" passato da App.jsx nella sezione dei siti
    // console.log(site)


    const [tecs,setTecs] = useState([]);
    const [title,setTitle] = useState([]);
    const [date,setDate] = useState([]);

    //imposto gli stati in base a cosa ricevo nei parametri url
    useEffect(() =>{
        progetti.forEach(element => {
            if(element.ref == site) {

                switch(site) {
                    case "myWallet": 
                        setTitle(element.title)
                        setTecs(element.tecs)
                        setDate(element.date)
                    case "olivicola": 
                            setTitle(element.title)
                            setTecs(element.tecs)
                            setDate(element.date)
                }
            }
        });
    }, [site])



    const sezHorzScroll = useRef(null);
    const scrollCont = useRef(null);

    
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

            // ScrollTrigger.create({
            //     animation: tl,
            //     trigger: sezHorzScroll.current,
            //     start: "top top",
            //     end: () => "+=4000", // Diversi valori di fine per mobile e desktop
            //     scrub: 1,
            //     pin: true,
            //     // markers: true
            // });
            
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
            <div id="progTitle">
                <h2>{title}</h2>
                <p>{date}</p>
            </div>
            <div id="whatIs">
                {
                    //stampo la lista che ho recuperato sopra
                    tecs.map((el, index) => {
                        //in React, se utilizzi una funzione senza return esplicito, non restituirà nulla
                        return <h6 key={index}>{el}</h6>
                    })
                }
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