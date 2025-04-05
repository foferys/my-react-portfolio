import { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ClickTermCatContext } from "../store/ClickTermCatProvider";


function Motivate() {

    const [frase, setFrase] = useState('');
    const [keyWord, setkeyWord] = useState('');
    const [modalRest, setModalRest] = useState(false);
    const [fetching ,setFetching] = useState(false); // -> lo uso nella gestione del caricamento per la risposta del fetch


    //animazione con gsap - useRef come attributo nell'elemento del terminalegatto 
    const catTerminal = useRef(null);

    
    
    
    //animazione iniziale comparsa terminalino, con dipendenza vuota per dire che lo fa solo al montaggio del componente 
    //(tra l'altro se lo metto sopra all'altro non esegue quello che deve)
    useEffect(() => {
        gsap.fromTo(catTerminal.current, {opacity: 0,}, {
            opacity:1,
            ease: "Power2.easeInOut",
        })
    }, [])
    
    //animazione iniziale comparsa terminalino, senza dipendenza perché abbiamo bisogno che l'animazine sia presente sempre nel componente
    useEffect(() =>{
        gsap.fromTo(catTerminal.current, { opacity: 1 },{  // Stato iniziale 
                opacity: 0,   // Stato finale
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: ".third-box",
                    scrub: true,
                }
            }
        );
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
            const randomnum = Math.floor(Math.random() * jsonData.data.filter(parola => parola.includes(keyWord.toLowerCase())).length)
            // Imposta il fatto dei gatti nello stato filtrato per la parola presa col numero casuale e impostata giu
            setFrase(jsonData.data.filter(parola => parola.includes(keyWord.toLowerCase()))[randomnum]); 
            
            // se non ci sono frasi con quella parola imposto lo stato della frase con un messaggio di avviso
            if(jsonData.data.filter(parola => parola.includes(keyWord.toLowerCase())).length <=0) {
                setFrase("Nothing relevant with " + keyWord);
            }

            document.getElementById("catTerminal").value = ""; //porto a vuoto l'input

            setFetching(false); //-> lo uso nella gestione del caricamento per la risposta del fetch

            // console.log(jsonData.data);
            // console.log("numero casuale: "+randomnum);
            // console.log("parola normale: " + keyWord);
            // console.log("parol lowercase: " + keyWord.toLowerCase());
            // console.log("frasi filtrate: " + jsonData.data.filter(parola => parola.includes(keyWord.toLowerCase())));
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
            setFetching(true) //lo uso nella gestione del caricamento per la risposta del fetch con useState e giu verifico se è impostato o meno
        }
    };

    //all'input giu ho impostato che a ogni cambio deve impostare la parola con setKeyword() per far si che sia sempre la parola intera prima dell'invio
    const handleChange = () => {
        const word = document.querySelector("#catTerminal").value;
        setkeyWord(word);
    };

    //nascondo la modalina perché impostando la frase a niente sotto ho un ternario che fa si che se 
    //non è settata una frase deve aggiungere la classe hidden
    const handleFocusOut = () => {
        //modalRest fa riferimento allo stato per gestire la visibilità della modale con con hidden nel div sotto
        if(!modalRest) {
            setFrase("");
        }
    }

    // gestione del mouse per far si che posso copiare il testo della modaleCat impostando i due eventi del mouse
    const handleRest = () => {
        setModalRest(true);
    }
    const handleLeave = () => {
        setModalRest(false);
        setFrase("")
    }


    const {setTerminalClicked} = useContext(ClickTermCatContext);

    const clickTerminal = () => {
        setTerminalClicked("si");
    }


    return(
        <>
            <div id="fraseMotivazionale" ref={catTerminal}>

                <p>{fetching?
                    
                    // caricamento spinner bootstrap se non trova lo stato currentTime
                    <div className="spinner-grow spinner-grow-sm" role="status">
                        <span className="sr-only"></span>
                    </div>
                    :
                    ""

                }</p>

                {/* imposto classe in base a se frase c'è o no */}
                <div className={`catmodal ${(frase || modalRest)? "":"hidden"}`} onMouseMove={handleRest} onMouseLeave={handleLeave}>
                    <p>{frase}</p>
                </div>
                

                <div className="terminalCont">
                    <div className="catTerminalInput">
                        <span className="text-success">cat@facts</span>: ~$
                    </div>
                    <input onBlur={handleFocusOut} onChange={handleChange} onKeyDown={handleKeyDown} onClick={clickTerminal} type="text" id="catTerminal" />
                </div>
            </div>
            
        </>
    )
}

export default Motivate;