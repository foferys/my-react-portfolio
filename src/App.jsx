import { useEffect, useState } from 'react';
import './App.css';
import './js/main.js';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import AudioPlayer from './components/Audio';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import fofeCover from './assets/video/fofecover.mp4';
import myWallett from './img/mysmartwallet.jpg';
import olivicola from './img/olivicola.png';
import fuji4 from './img/fuji4.png';
import fuji from './img/fuji.png';
import bergare from './img/bergare.png';
import galatro from './img/galatro.jpg';
import primacom from './img/primacom.png';
import bilanciophp from './img/bilanciophp.jpg';
import ecomm from './img/ecommerce.jpg';

function App() {

  // ---- indicatore scroll home---
    const [scrollHidden, setScrollHidden] = useState(false);

    // funzione che verifica lo scroll della pagina e aggiorna lo stato, di cui la variabile scrollHidden è aggiunta nella classe dell'elemento
    //giu, e verifica se è true aggiunge la classe hidden altrimenti la rimuove (riga 71)
    const scrollIndicator = () =>{

      if (window.scrollY > 350) {
        setScrollHidden(true);
      } else {
        setScrollHidden(false);
      }

    }

    // con useEffect effettuo il listener allo scroll e richiamo la fuonzione per verificare dove si trova
    useEffect(() => {
      window.addEventListener("scroll", function() {
        scrollIndicator();
      })

      // Cleanup quando il componente viene smontato
      return () => {
        window.removeEventListener('scroll', scrollIndicator);
      };
    }, []);
    
  // ---- fine indicatore scroll home-----------

  //--OBSERVER ANIMAZIONE ALLO SCROLL ---------

    useEffect(() => {
      const elementsToWatch = document.querySelectorAll('.watch');
      const elementsToWatch2 = document.querySelectorAll('.watch2');
      
      const callback = (items) => {
        items.forEach((item) => {
          if (item.isIntersecting) {
            item.target.classList.add('in-page');
          } else {
            //se ha la casse watch2 non rimuoviamo in-page cosi effettua l'animazione solo una volta
            if(!item.target.classList.contains("watch2")) {
              item.target.classList.remove('in-page');
            }
          }
        });
      };

      // observer - CONTROLLA TUTTI GLI ELEMENTI NELLA FUNZIONE CALLBACK ^ 
      //E SE STANNO ENTRANDO NELLA PAG GLI AGGIUNGE LA CLASSE "in-page" attraverso la funzione in
      //alto callback, e se non sono nella pagina rimuove la classe "in-page"
      const observer = new IntersectionObserver(callback, { threshold: 0.6 });

      // applico l'observer con un foreach a tutti gli elementi watch
      elementsToWatch.forEach((element) => observer.observe(element));
      elementsToWatch2.forEach((element) => observer.observe(element));

      // Cleanup dell'observer quando il componente viene smontato
      return () => {
        elementsToWatch.forEach((element) => observer.unobserve(element));
      };
    }, []); // L'array vuoto [] fa sì che l'effetto venga eseguito solo una volta, al montaggio del componente.

  //--fine OBSERVER ANIMAZIONE ALLO SCROLL ---------
  
  //--OBSERVER ANIMAZIONE ALLO SCROLL  SENZA RITORNO---------
  
    useEffect(() => {
      
    }, []);
  //--OBSERVER ANIMAZIONE ALLO SCROLL  SENZA RITORNO---------
  


  return (
    <>
    <AudioPlayer></AudioPlayer>
    <Cursor></Cursor>
    <Navbar></Navbar>
    <BottomNav></BottomNav>
      
    
    <video className="video-bg" src={fofeCover} loop autoPlay muted></video>
    
    <div className="section watch">
      <div className="title mediafont">
        <div>
          <h5 className="mestesso">Ciao, il mio nome è Gianpiero</h5>
          <h1 className="mainTitle">Full-stack web Developer</h1>
        </div>
        <p className="title subtitle1">
          Java Junior developer | Front & Back End - di Cosenza, specializzato nella
          creazione di web App e siti con design unici e innovativi.
        </p>
      </div>
      <div className="scroll_box">
        <div className={`scroll_down ${scrollHidden ? 'hidden':''}`}></div>
      </div>
    </div>

    <div className="section watch">
        <h2 className="title mediafont_big testiIniziali">
            Amo il mio lavoro e mettere il mio know-how al servizio del team per raggiungere gli obiettivi comuni.
        </h2>
    </div>

    <div className="section watch third-box">
      <h2 className="title h2">
          Possiedo anche ottime capacità di Graphic Design e modellazione 3D. <br/> <br/> Una combinazione creativa di logica del codice ed estetica del design 
          mi permette di lavorare efficacemente in entrambi i campi.
      </h2>
      <a className="title button" href="mailto:gianpieroweno@hotmail.it" >Scrivimi</a>
    </div>    


    
    {/* <!--pannello bianco che entra dopo titoli--> */}
    <div className="panel ">
      <span id="siti"></span>
      <div className="container_">

        <h2 className="intro watch2 fade-in">Progetti Recenti</h2>
        <p className="watch2 fade-in">
          Attraverso il mio know-how e la mia esperienza nella programmazione web, ho sviluppato siti 
          personalizzati che si distinguono per <b>funzionalità</b>, <b>design</b> e <b>prestazioni</b>.
        </p>
        <br/><br/>
        
      </div>


      <div className="internCont ">


        <div className="textAndImg ">
          <div className="servizi watch2 fade-in">
            <p>00-1</p>
            <a href="https://github.com/Agarbala/mysmartwallet" target="_blank">My Smart Wallet</a>
            <span>
              <p>2023 <br />Java Spring Project</p>
            </span>
          </div>
          <img className="img" src={myWallett} alt="applicazione java mysmartwallet" />

          <div className="servizi watch2 fade-in">
            <p>00-2</p> <br />
            <a href="https://www.oliveoilfromeurope.eu/" target="_blank">Olivicola<span>*</span></a> <br />
            <span>
              <p>2023 <br />Piattaforma Web con Giochi</p>
            </span>
          </div>
          <img className="img" src={olivicola} alt="immagine sito Olivicola" />

          <div className="servizi watch2 fade-in">
            <p>00-3</p> <br />
            <a href="" target="_blank">Bergarè<span>*</span></a> <br />
            <span>
              <p>2023 <br />Website Evento</p>
            </span>
          </div>
          <img className="img" src={bergare} alt="immagine sito Bergarè" />

          <div className="servizi watch2 fade-in">
            <p>00-4</p> <br />
            <a href="https://www.letermedigalatro.it/" target="_blank">Terme di Galatro<span>*</span></a> <br />
            <span>
              <p>2023 <br />Centro Termale</p>
            </span>
          </div>
          <img className="img" src={galatro} alt="immagine sito Terme di Galatro" />

          <div className="servizi watch2 fade-in">
            <p>00-5</p>
            <a href="https://primacom.cloud/" target="_blank">Primacom<span>*</span></a>
            <span>
              <p>2023<br />Website</p>
            </span>
          </div>
          <img className="img" src={primacom} alt="sito Primacom" />

          <div className="servizi watch2 fade-in">
            <p>00-6</p>
            <a href="https://marcoferraro.netsons.org/" target="_blank">Bilancio</a>
            <span>
              <p>2022 <br />PHP Project</p>
            </span>
          </div>
          <img className="img" src={bilanciophp} alt="progetto bilancio in php" />

          <div className="servizi watch2 fade-in">
            <p>00-7</p>
            <a href="https://github.com/gianpieroferraro/E-commerce" target="_blank">e-commerce</a>
            <span>
              <p>2022 <br />Full stack Project</p>
            </span>
          </div>
          <img className="img" src={ecomm} alt="progetto ecommerce" />


          <br /><br />
          <p className="asterisco">* Progetti realizzati per Primacom S.r.l.</p>
          <br /><br />
          <p id="descWebs" className="watch2 fade-in">
            Sono in grado di fornire informazioni dettagliate sui prodotti e servizi attraverso l'utilizzo di tecniche di content marketing,
            facilitando così le operazioni di marketing e di vendita online. Inoltre, posso creare una <b>user experience</b> coinvolgente e intuitiva
            per migliorare l'<b>esperienza dell'utente</b>, aumentando la fidelizzazione del cliente e il tasso di conversione delle visite in acquisti.
          </p>

        </div>
      </div>
        
    </div>

 


    <span id="3d"></span>
    <div className="panel panel--white">
      <div className="container3d">
        <p className="watch2 fade-in">Modellazione 3D</p>
        <h2 className="watch2 fade-in title-med"> Un mondo duro da plasmare.<br/> </h2>

        <p className="watch2 fade-in subtitle">
        La <b>modellazione 3D</b> è un'arte incredibilmente versatile che può essere utilizzata per arricchire
        i contenuti dei siti web in modo sorprendente. <br/><br/> Grazie alla mia esperienza e alle mie competenze, sono in grado
          di creare modelli 3D dettagliati e realistici che possono rendere i contenuti dei siti web ancora più <b>coinvolgenti</b>
          e <b>attraenti</b> per gli utenti.
        </p>
        <p className="watch2 fade-in "><a className="orange-text" href="./3d.html">Entra nel mio mondo 3D</a> </p>
        <img className="img-big-center watch2 fade-in" src={fuji4} alt="prototipo fujifilm xe5"/>
        <img className="img-big-center2 watch2 fade-in" src={fuji} alt="prototipo fujifilm xe5 3D"/>

      </div>
    </div>


    <div className="imgBox">
      <div className="pAbout">
        <h2 className="watch2 fade-in"> Aiuto le Aziende a Brillare</h2>
        <p className="watch2 fade-in">
          Mi chiamo Gianpiero Ferraro e sono un Full-stack Web Developer.
          Creo e sviluppo esperienze digitali e Web App personalizzate, concentrandomi sugli obiettivi,
          l'emozione e i dettagli. <br/><br/>

          Vivo e lavoro a Cosenza, nella stupenda e poco riconoscita Calabria dove
          coltivo la mia passione per Informatica, Design e Codice.
          <br/><br/>
          <b>
            Credo che tutte le cose belle siano realizzate da chi è disposto
            a metterci passione, coraggio e artigianalità. Mi piace lavorare
            con agenzie e persone entusiaste in cerca di soluzioni
            sartoriali in grado di attrarre, ispirare e convertire.
          </b>
        </p>
        <br/>
        <div className="socialAbout watch2 fade-in">
          <a href="https://www.linkedin.com/in/gianpiero-ferraro/" target="_blank">Lin </a>|
          <a href="https://github.com/gianpieroferraro" target="_blank"> GitH </a>|
          <a href="https://www.instagram.com/gianpieroferraro.ph/" target="_blank"> Ins</a>

        </div>
      </div>
    </div>


    <Footer></Footer>
    
    </>
  )
}

export default App
