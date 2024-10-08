import { useEffect, useState } from 'react';
import './App.css';
// import './js/main.js';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import AudioPlayer from './components/Audio';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import fofeCoverVid from './assets/video/noise.mp4';
import code from './assets/video/code.mp4';
import coding from './assets/video/coding.mp4';
import cover_coding from './assets/video/cover_coding.mp4';
import cover_binary from './assets/video/cover_binary.mp4';
import codeboy2 from './assets/video/codeboy2.mp4';
import tv from './assets/video/tv.mp4';
import myWallett from './img/mysmartwallet.jpg';
import olivicola from './img/olivicola.png';
import fuji4 from './img/fuji4.png';
import fuji from './img/fuji.png';
import bergamotto from './img/bergamotto.png';
import galatro from './img/galatro.jpg';
import primacom from './img/primacom.png';
import bilanciophp from './img/bilanciophp.jpg';
import ecomm from './img/ecommerce.jpg';
import { Link, useFetcher } from 'react-router-dom';
import Motivate from './components/Motivate';
import Loader from './components/Loader';
import Canvas from './components/Canvas';


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

    //--OBSERVER ANIMAZIONE ALLO SCROLL (quello per gli elementi watch 2 l'ho messo nel footer perché viene importato e c'è anche nelle altre pagine) ---------

    useEffect(() => {
      const elementsToWatch = document.querySelectorAll('.watch');

      
      const callback = (items) => {
        items.forEach((item) => {
          if (item.isIntersecting) {
            item.target.classList.add('in-page');
          } else {
            item.target.classList.remove('in-page');
          }
        });
      };

      // observer - CONTROLLA TUTTI GLI ELEMENTI NELLA FUNZIONE CALLBACK ^ 
      //E SE STANNO ENTRANDO NELLA PAG GLI AGGIUNGE LA CLASSE "in-page" attraverso la funzione in
      //alto callback, e se non sono nella pagina rimuove la classe "in-page"
      const observer = new IntersectionObserver(callback, { threshold: 0.6 });

      // applico l'observer con un foreach a tutti gli elementi watch
      elementsToWatch.forEach((element) => observer.observe(element));

      // Cleanup dell'observer quando il componente viene smontato
      return () => {
        elementsToWatch.forEach((element) => observer.unobserve(element));
      };
    }, []); // L'array vuoto [] fa sì che l'effetto venga eseguito solo una volta, al montaggio del componente.

  //--fine OBSERVER ANIMAZIONE ALLO SCROLL ---------

  useEffect(() => {
    const text = document.querySelectorAll(".servizi");
    const texto = document.querySelectorAll(".servizi a");
    const image = document.querySelectorAll(".img");

    for(let i=0; i<text.length; i++) {

      text[i].addEventListener("mousemove", function(event) {
        image[i].style.left = `${event.clientX}px`;
        image[i].style.top = event.clientY + "px";
        image[i].style.opacity="1";
        image[i].style.zIndex="999";

        let key = text[i];
        for(let x=0; x<text.length; x++) {
          if(text[x] != key){
            text[x].style.opacity="0.2";
          }else{
            texto[x].style.opacity="1";
          }
        }

      });

      text[i].addEventListener("mouseleave", function(event) {
        image[i].style.opacity="0";
        image[i].style.zIndex="9";
        for(let x=0; x<text.length; x++) {
          
          text[x].style.opacity="1";
        }
      });
    }


  }, []);

  return (
    <>
    <AudioPlayer></AudioPlayer>
    <Cursor></Cursor>
    <Motivate></Motivate>
    <Navbar page3d={false}></Navbar>
    <Loader></Loader>
    <BottomNav></BottomNav>
    
    
    <video className="video-bg" src={code} loop autoPlay muted></video>
    
    <div className="section watch">
      <div className="title mediafont">
        <div>
          <h5 className="mestesso h6">Hi, my name is Gianpiero</h5>
         
          <span id='loghiTech'>
            <div className='d-flex gap-2 align-items-center justify-content-center' >
              <a href="https://www.oracle.com/java/" target="_blank" rel="noreferrer">
                <img className='tinted-logo' src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/java-colored.svg" width="26" height="26" alt="Java" />
              </a>
              <a href="https://cdn.worldvectorlogo.com/logos/spring-3.svg" target="_blank" rel="noreferrer">
                <img className='tinted-logo' src="https://upload.wikimedia.org/wikipedia/commons/4/44/Spring_Framework_Logo_2018.svg" width="46" height="46" alt="spring" />
              </a>
              <a href="https://www.php.net/" target="_blank" rel="noreferrer">
                <img className='tinted-logo' src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/php-colored.svg" width="40" height="40" alt="PHP" />
              </a>
              <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" > 
                <img className='tinted-logo' src="https://seeklogo.com/images/J/javascript-logo-F248CC9425-seeklogo.com.png" alt="javascript" width="20" height="20"/>
              </a>
              <a href="https://developer.mozilla.org/en-US/docs/Glossary/HTML5" target="_blank" rel="noreferrer">
                <img className='tinted-logo' src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/html5-colored.svg" width="20" height="20" alt="HTML5" />
              </a>
              <a href="https://www.w3.org/TR/CSS/#css" target="_blank" rel="noreferrer">
                <img className='tinted-logo' src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/css3-colored.svg" width="20" height="20" alt="CSS3" />
              </a>

              <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> 
                <img className='tinted-logo' src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> 
              </a>
              <a href="https://git-scm.com/" > 
                <img className='tinted-logo' src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="20" height="20"/>
              </a>
              <a href="https://laravel.com/" target="_blank" rel="noreferrer">
                <img className='tinted-logo' src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/laravel-colored.svg" width="20" height="20" alt="Laravel" />
              </a>
              <a href="https://it.legacy.reactjs.org/" target="_blank" rel="noreferrer">
                <img className='tinted-logo' src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="20" height="20" alt="React" />
              </a>
              <a href="https://vitejs.dev/" target="_blank" rel="noreferrer">
                <img className='tinted-logo' src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/vite-colored.svg" width="20" height="20" alt="Vite" />
              </a>
            </div>  
            
          </span>
          <h1 className="mainTitle">Java web Developer</h1>
          
        </div>
        <p className="title subtitle1">
          💻 Passionate about <b className='text-orange'>&nbsp;Technology&nbsp;</b> and <b className='text-orange'>&nbsp;Programming</b>.&nbsp; 千里の道も一歩から <br /> 
        </p>
      </div>
      <div className="scroll_box">
        <div className={`scroll_down ${scrollHidden ? 'hidden':''}`}></div>
      </div>
    </div>

    <div className="section watch">
        <h2 className="title mediafont_big testiIniziali">
          I craft Web Apps and Websites that align with your brand
          and engage your audience – creating
          meaningful and memorable experiences.
        </h2>
    </div>

    <div className="section watch third-box">
      <p className="title">
        Animations and interactions are crucial for creating
        dynamic and engaging digital experiences. I utilise
        the latest tools to design and implement rich
        interactive elements, from subtle movements to
        complex animations.
      </p>
      <a className="title button" href="mailto:gianpieroweno@hotmail.it" >Let's collaborate</a>
    </div>    


    
    {/* <!--pannello bianco che entra dopo titoli--> */}
    <div className="panel ">
      <span id="siti"></span>
      <div className="container_">

        <h2 className="intro watch2 fade-in">Recent Progects</h2>
        <p className="watch2 fade-in">
          Starting a new Project? Choosing the right tools is key. <br /> <b className='text-uppercase'>I've been there, and I can help you find the best options.</b>
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
            <a href="https://www.consorzioditutelabergamottorc.it/" target="_blank">Bergamotto RC<span>*</span></a> <br />
            <span>
              <p>2023 <br />Website</p>
            </span>
          </div>
          <img className="img" src={bergamotto} alt="immagine sito Bergarè" />

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

        </div>
      </div>
        
    </div>

 
    {/* <Canvas></Canvas> */}

    <span id="3d"></span>
    <div className="panel panel--white">
      <div className="container3d">
        <p className="watch2 fade-in">Modellazione 3D</p>
        <h2 className="watch2 fade-in title-med"> Un mondo duro da plasmare.<br/> </h2>

        <p className="watch2 fade-in subtitle">
        La <b>modellazione 3D</b> è un'arte incredibilmente versatile che può essere utilizzata per arricchire
        i contenuti dei siti web in modo sorprendente. <br/><br/> Grazie alla mia esperienza e alle mie competenze, sono in grado
          di creare modelli 3D dettagliati e realistici che possono rendere i contenuti dei siti web ancora più <b>coinvolgenti </b>
          e <b>attraenti</b> per gli utenti.
        </p>
        <p className="watch2 fade-in ">
          <Link to={"/3d"} ><a className="orange-text link3d"  style={{color: '#f56900 !important',}}>Entra nel mio mondo 3D</a></Link>
        </p>
        <img className="img-big-center watch2 fade-in" src={fuji4} alt="prototipo fujifilm xe5"/>
        <img className="img-big-center2 watch2 fade-in" src={fuji} alt="prototipo fujifilm xe5 3D"/>

      </div>
    </div>


    <div className="imgBox">
      <div className="pAbout">
        <h2 className="watch2 fade-in">Helping Businesses Shine </h2>
        <p className="watch2 fade-in">
       
          My creative journey started 15 years ago when I discovered my passion for computers. Fascinated by technology and driven 
          by a strong desire to learn, I dedicated countless hours to <b className='text-orange'>programming</b>, a touch of <b className='text-orange'>graphic design</b> and <b className='text-orange'>3D</b> 
          through online resources and personal projects. <br />
          This passion naturally led me to pursue further studies in these areas, allowing 
          me to quickly apply my skills in a professional environment. <br /><br /> I also have a deep appreciation for <b className='text-orange'>Japanese culture</b>, which inspires 
          my creative work and fuels my enthusiasm for all things digital.

        </p>
        <br/>
        <div className="socialAbout watch2 fade-in">
          <a href="https://www.linkedin.com/in/gianpiero-ferraro/" target="_blank">Lin </a>|
          <a href="https://github.com/foferys" target="_blank"> GitH </a>|
          <a href="https://www.instagram.com/gianpieroferraro.ph/" target="_blank"> Ins</a>

        </div>
      </div>
    </div>


    <Footer></Footer>
    
    </>
  )
}

export default App
