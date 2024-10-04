import React, {useRef, useEffect, usest } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Canvas = () => {

    
    
    return (
        <>
         {/* <!-- canvas per animazione scroll 3D  --> */}

        <div id="canvasbox">

            {/* <img src="src/quadroani2/1-min.jpg" alt="" /> */}

            <canvas class="canvas" />

            <h2 class="trigText">Crea. Anima. Incanta.</h2>
            <span class="trigText2">

                <p>
                    Attirare l'attenzione e aumentare l'attrattiva visiva complessiva del tuo sito. 
                </p>
            </span>


            <p class="copy">
                <strong>Tecniche di illuminazione</strong> studiate con cura lavorano insieme per eliminare le distrazioni,   
                <span class="green-text">avvolgendoti</span> in un mondo visivo di pura &nbsp;meraviglia.
                
            </p>

            <div class="lineCont">
                <div class="line"></div>
            </div>
            
        </div>
        </>
    )

};

export default Canvas;
