import React, { useEffect, useRef } from 'react';

const Cursor = () => {
    // Usare useRef per i riferimenti agli elementi cursor e outline
    // cursorRef e outlineRef sono come delle "etichette" che ci permettono di manipolare questi due elementi direttamente dal codice.
    /*--useRef-- è un Hook di React che viene utilizzato per creare un oggetto di riferimento mutabile che non provoca un re-render 
     * del componente quando cambia. In parole semplici, useRef ti permette di "puntare" a un elemento o a un valore che vuoi mantenere 
     * stabile anche se il componente si aggiorna o cambia stato. 
     * Qui, useRef(null) crea un oggetto di riferimento e inizializza .current a null.*/
    const cursorRef = useRef(null);
    const outlineRef = useRef(null);


    // useEffect è come una scatola in cui mettiamo del codice che vogliamo eseguire quando il componente è "montato" (cioè quando compare sullo schermo).
    // cursor e outline sono variabili che rappresentano gli elementi HTML a cui puntano cursorRef e outlineRef.
    useEffect(() => {
      /*React assegna l'elemento HTML reale alla proprietà .current del riferimento cursorRef. In questo caso, l'elemento <div className="cursor">
      viene assegnato a cursorRef.current. */
      const cursor = cursorRef.current;
      const outline = outlineRef.current;

      const handleMouseMove = (e) => {
        const x = e.clientX;
        const y = e.clientY;

        cursor.style.transform = `translate( calc(${x}px - 50%), calc(${y}px - 50%) )`;
        outline.style.transform = `translate( calc(${x}px - 50%), calc(${y}px - 50%) )`;
      };

      const handleMouseOver = () => {
        outline.classList.add('hover');
      };

      const handleMouseLeave = () => {
        outline.classList.remove('hover');
      };

      document.addEventListener('mousemove', handleMouseMove);

      const links = document.querySelectorAll('a');
      links.forEach((link) => {
        link.addEventListener('mouseover', handleMouseOver);
        link.addEventListener('mouseleave', handleMouseLeave);
      });

      // Cleanup function to remove event listeners when component is unmounted
      /*La funzione return dentro useEffect si chiama funzione di "cleanup".
      Serve a rimuovere gli eventi quando il componente viene eliminato, così il programma non continua a cercare di muovere un cursore che non esiste più.   */
      return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          links.forEach((link) => {
            link.removeEventListener('mouseover', handleMouseOver);
            link.removeEventListener('mouseleave', handleMouseLeave);
          });
      };
    }, []);

    return (
    <>
      {/* Cursore */}
      <div ref={cursorRef} className="cursor"></div>
      <div ref={outlineRef} className="outline"></div>

      {/* Pulsante per disattivare il cursore estetico */}
      {/* <div id="noCursor">
        <div id="cursorSwitch">
          <a className="cursorText">
            <i className="uil uil-mouse-alt"></i>
          </a>
        </div>
      </div> */}
    </>
  );
};

export default Cursor;
