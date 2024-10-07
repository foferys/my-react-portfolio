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
        frame da 0 a frameCount - 1 (nel mio caso, da 0 a 169), in base allo scroll dell'utente.*/
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
                markers: true 
            },
            onUpdate: render /*: Ogni volta che frameCorrente.frame cambia durante lo scroll, 
            viene eseguita la funzione render per aggiornare il contenuto del canvas. */
        });

        // Pulizia in caso di smontaggio del componente
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [frameCount]);



  return (
    <div id="canvasbox">
      <canvas ref={canvasRef} className="canvas" />
    </div>
  );

};

export default Canvas;
