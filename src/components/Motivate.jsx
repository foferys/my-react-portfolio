import { useEffect, useRef, useState } from "react";
import gsap from "gsap";


function Motivate() {

    const [frase, setFrase] = useState('');
    const [keyWord, setkeyWord] = useState('');

    //animazione con gsap - useRef come attributo nell'elemento del terminalegatto 
    const catTerminal = useRef(null);

    useEffect(() =>{
        gsap.to(catTerminal.current, {
            opacity:1,
            duration: 2.9,
            ease: "expo.out",
            delay: 1.2,
        })
        
    })

  

    /*-| Quando serve useEffect:
        useEffect è utile quando vuoi eseguire una funzione una volta che il componente è stato montato o ogni volta che una variabile di dipendenza cambia. 
        Un esempio classico è il caricamento di dati appena il componente appare nella pagina, come ottenere dati da un'API all'inizio:
        useEffect(() => {
            fetchCatFact();
        }, []); // L'array vuoto fa sì che la funzione venga chiamata solo una volta al montaggio 
    */
    const fetchCatFact = async () => {
        try {
            const url = `https://meowfacts.herokuapp.com/?count=100`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Errore nella richiesta: ${response.status}`);
            }

            const jsonData = await response.json();
            //prendo un numero casuale in base alla lunghezza delle parole filtrate con quella impostata nello stato
            const randomnum = Math.floor(Math.random() * jsonData.data.filter(parola => parola.includes(keyWord)).length)
            // Imposta il fatto dei gatti nello stato filtrato per la parola presa col numero casuale e impostata giu
            setFrase(jsonData.data.filter(parola => parola.includes(keyWord))[randomnum]); 
            
            // se non ci sono frasi con quella parola imposto lo stato della frase con un messaggio di avviso
            if(jsonData.data.filter(parola => parola.includes(keyWord)).length <=0) {
                setFrase("Nothing relevant with " + keyWord);
            }

            document.getElementById("catTerminal").value = ""; //porto a vuoto l'input
            // console.log(jsonData.data);
            // console.log("numero casuale: "+randomnum);
            // console.log("frasi filtrate: " + jsonData.data.filter(parola => parola.includes(keyWord)));
            // console.log("lunghezza filtrato: " + jsonData.data.filter(parola => parola.includes(keyWord)).length);
            // console.log(jsonData.data.filter(parola => parola.includes(keyWord))[0]);
        } catch (error) {
            console.log(error.message); // Gestione degli errori
        }
    };

    // Gestore per la pressione di "Invio"
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchCatFact(); // Chiama la funzione quando viene premuto "Invio"
        }
    };

    //all'input giu ho impostato che a ogni cambio deve impostare la parola con setKeyword()
    const handleChange = () => {
        const word = document.querySelector("#catTerminal").value;
        setkeyWord(word);
    };

    const handleFocusOut = () => {
        setFrase("");
    }

    return(
        <>
            <div id="fraseMotivazionale" ref={catTerminal}>
                {/* imposto classe in base a se frase c'è o no */}
                <div className={`catmodal ${(frase)? "":"hidden"}`}>
                    <p>{frase}</p>
                </div>
                

                <div className="terminalCont">
                    <div className="catTerminalInput"><span className="text-success">cat@facts</span>: ~$</div><input onBlur={handleFocusOut} onChange={handleChange} onKeyDown={handleKeyDown} type="text" id="catTerminal" />
                </div>
            </div>
            
        </>
    )
}

export default Motivate;