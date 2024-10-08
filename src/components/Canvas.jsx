import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registra il plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Canvas = () => {


    const canvasRef = useRef(null);
    const frameCount = 170;

    const currentFrame = (index) => {
        return `/src/quadroani2/${(index + 1).toString()}-min.jpg`;
    };

    //Precaricamento delle immagini: Le immagini vengono precaricate una sola volta all'interno di 
    //useEffect per evitare richieste multiple.
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');// Crea il contesto 2D per disegnare sul canvas

        // Imposta le dimensioni del canvas per adattarsi alla finestra del browser
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const images = [];

        let frameCorrente = { 
            frame: 0 
        };

        // Precarica immagini
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();    // Crea un nuovo oggetto immagine
            img.src = currentFrame(i);
            images.push(img);
        }

        // Funzione di rendering
        const render = () => {
            const image = images[frameCorrente.frame];
            if (image) {
                context.clearRect(0, 0, canvas.width, canvas.height);// Pulisce il canvas
                context.drawImage(image, 0, 0, canvas.width, canvas.height);//disegna sul canvas l'immagine corrente
            }
        };

        /*usiamo gsap per animare il valore di frameCorrente.frame in base allo scroll dell'utente:
        Questa funzione crea un'animazione che cambia gradualmente il valore di frameCorrente.
        frame da 0 a frameCount - 1 (nel mio caso, da 0 a 169), in base allo scroll dell'utente.
        -- l'elemento html canvasBox è relative e i testi al suo interno sono absolute e hanno una posizione specifica
            con lo scroller start ed end indichiamo a quale altezza e fine della viewport deve iniziare e finire l'animazione 
        */
        gsap.to(frameCorrente, {
            // Anima il valore di frameCorrente.frame da 0 a frameCount - 1
            frame: frameCount - 1,
            snap: 'frame', // Assicura che il frame venga arrotondato a numeri interi (per evitare animazioni non fluide)
            ease: 'none',  // Rende l'animazione lineare, senza accelerazioni o decelerazioni
      
            // Configura ScrollTrigger per controllare l'animazione durante lo scrolling
            scrollTrigger: {
              scrub: 0.5,  // Permette all'animazione di sincronizzarsi con lo scroll in modo fluido. Il valore 0.5 indica che l'animazione è leggermente ritardata rispetto allo scroll, per un effetto più morbido.
              pin: canvas, // Fissa il canvas durante lo scroll (l'elemento rimane fermo mentre la pagina scorre)
              end: '300%', // Fine dell'animazione, significa che l'animazione termina quando si è scrollato il 300% dell'altezza viewport
                // markers: true 
            },
            onUpdate: render /*: Ogni volta che frameCorrente.frame cambia durante lo scroll, 
            viene eseguita la funzione render per aggiornare il contenuto del canvas. */
        });

        // Pulizia in caso di smontaggio del componente
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [frameCount]);



    //animazione testi 
    const tl = gsap.timeline();
    const titolo3dtext = useRef(null);
    const par3dtext = useRef(null);
    const copy = useRef(null);
    const linea = useRef(null);


    const timeline = gsap.timeline({paused: true,})
    
 
    useEffect(() => {

        if (titolo3dtext.current && par3dtext.current && copy.current) { // Verifica che il riferimento non sia nullo
            gsap.fromTo(titolo3dtext.current, {opacity: 0},{
                y: "-20px",
                opacity: 1,
                scrollTrigger: {
                    trigger: titolo3dtext.current, // Usa il riferimento corretto per il trigger
                    pin: titolo3dtext.current,
                    // markers: true, 
                    start: "top 20%", // Inizio dell'animazione quando l'elemento è visibile all'80% dal top
                    end: "bottom -1900px", // Fine dell'animazione quando il bottom dell'elemento raggiunge il 20% dal bottom della viewport
                    scrub: true, // Cambia a true per un effetto di scrub controllato
                }
            })
            gsap.fromTo(par3dtext.current, {opacity: 0}, {
                y: "-20px",
                opacity: 1,
                ease: "circ.out",
                // delay: 1, //se c'è lo scrub non funziona
                scrollTrigger: {
                    trigger: par3dtext.current, // Usa il riferimento corretto per il trigger
                    pin:  par3dtext.current, // Questo significa che, quando l'elemento raggiungerà il punto definito da start, rimarrà bloccato
                    // markers: true, 
                    start: "top 270px", // Inizio dell'animazione quando l'elemento è visibile a dal top
                    end: "bottom -1500px", 
                    scrub: true, // Cambia a true per un effetto di scrub controllato
                }
            })

            gsap.fromTo(copy.current, {opacity:0}, {
                opacity:1,
                x: "-40px",

                scrollTrigger: {
                  trigger: copy.current,
                  pin: copy.current,
                //   markers: true, 
                  start: "top 380px",
                  end: "bottom 70px",
                  scrub: true,
                },
            
            })

            timeline.to(linea.current, {
                width: "400px",
                opacity: 1,
                duration: 0.5,
            })
            gsap.to(linea.current, {
                scrollTrigger: {
                  trigger: linea.current, //prendo come riferimento il testo sopra altrimenti riferito alla linea .line sarebbe troppo in ritardo
                //   markers: true,
                  start: "bottom 500px",
                  end: "top 250%",
                  scrub: true,
                  onEnter: () => {
                    timeline.play()
                  },
                  onLeaveBack: () =>  {
                    timeline.reverse();
                  }
                }
              })

        }
    }, []); // Assicurati che l'array di dipendenze sia corretto
 



  return (
    <div id="canvasbox">
        <canvas ref={canvasRef} className="canvas" />

      
        <h2 className="trigText" ref={titolo3dtext}>Crea. Anima. Incanta.</h2>
        <div className="trigText2" ref={par3dtext}>
            <p>
                Attirare l'attenzione e aumentare l'attrattiva visiva complessiva del tuo sito. 
            </p>
        </div>


        <p className="copy" ref={copy}>
            <strong>Tecniche di illuminazione</strong> studiate con cura lavorano insieme per eliminare le distrazioni,   
            <span className="green-text">avvolgendoti</span> in un mondo visivo di pura &nbsp;meraviglia.
            
        </p>

        <div className="lineCont">
            <div className="line" ref={linea}></div>
        </div>
            
    </div>
  );

};

export default Canvas;
