import { current } from "@reduxjs/toolkit";
import img1 from "../img/ecommerce.jpg";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function OrizScrollingPage() {

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
            ScrollTrigger.create({
                animation: tl,
                trigger: sezHorzScroll.current,
                start: "top top",
                end: () => "+=4000", // Puoi definire la fine se necessario
                scrub: 1,
                pin: true,
                // markers: true
            
            });
    
            tl.to(sezHorzScroll.current, {
                x: scrollCont.current.clientWidth - sezHorzScroll.current.clientWidth,
                duration: 3
            })
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

            <div className="container" ref={scrollCont}>

                <div ref={sezHorzScroll} className="vh-100 d-flex align-items-center sezhorizScroll" >

                    <h1 className="text-success" style={{"font-size": "18vh",}}>Horizontal</h1>

                    <img className="" src={img1} alt="" style={{"object-fit": "cover", "object-position": "center", "aspect-ratio": 3 / 4, "height": "100%"}} />

                    <div className="" style={{"align-self": "flex-end",}}>
                        <p className="text-success" style={{"font-size": "18vh",}}>Horizontal</p>

                        <img src={img1} alt="" style={{"object-fit": "cover", "object-position": "center", "aspect-ratio": 3 / 4, "height": "100%"}} />
                    </div>
                    
                </div>

            </div>
        </section>
     
    )
}

export default OrizScrollingPage;