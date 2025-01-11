import React, { useEffect, useRef, useState } from 'react';
import './App.css';
// import './js/main.js';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import AudioPlayer from './components/Audio';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import code from './assets/video/code.mp4';
import { Link, useFetcher } from 'react-router-dom';
import Motivate from './components/Motivate';
import Loader from './components/Loader';
import gsap from 'gsap';
import { ClickTermCatProvider } from './store/ClickTermCatProvider';
import { progetti } from './dataprojects/progData';
import TextHoverEff from './components/TextHoverEff';
import { HoverProvider } from './store/HoverContext';


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

  // animazione immagine su link progetti
  useEffect(() => {
    const text = document.querySelectorAll(".servizi");
    const texto = document.querySelectorAll(".servizi a");
    const image = document.querySelectorAll(".img");

    for(let i=0; i<text.length; i++) {

      texto[i].addEventListener("mousemove", function(event) {

        image[i].style.opacity="1";
        image[i].style.zIndex="999";
        image[i].style.left = `${event.clientX - 100}px`; //-100 per centrarlo un po'
        image[i].style.top = event.clientY + "px";
        



        let key = text[i];
        for(let x=0; x<text.length; x++) {
          if(text[x] != key){
            text[x].style.opacity="0.2";
          }else{
            texto[x].style.opacity="1";
          }
        } 

      });

      texto[i].addEventListener("mouseleave", function(event) {
        image[i].style.opacity="0";
        image[i].style.zIndex="1";
        for(let x=0; x<texto.length; x++) {
          
          text[x].style.opacity="1";
        }
      });
    }


  }, []);

  const about = useRef(null);

  gsap.fromTo(about.current,{  filter: "blur(1px)",}, {
    margin: "30px",
    border: "1px solid rgba(0, 128, 0, 0.244)",
    borderRadius:"0",
    delay:1.7,
    filter: "blur(0px)",
    

    scrollTrigger: {
      trigger: about.current,
      scrub:2,
      // markers:true,
      start:"top 89%",
      end: "bottom 90%",
    }
  })




  return (
    <>
    <AudioPlayer></AudioPlayer>
    <Cursor></Cursor>

    {/* USO DEL contesto ClickTermCat creato nello store, che conteinte i due componenti nel quale è usato lo stato implementato in  ClickTermCat*/}
    <ClickTermCatProvider>
      <Motivate></Motivate>
      <Navbar page3d={false}></Navbar>
    </ClickTermCatProvider>

    <Loader></Loader>
    <BottomNav></BottomNav>
    
    
    <video className="video-bg" autoPlay loop muted playsInline>
      <source src={code} type="video/mp4"/>
    </video>
    
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

      {/* creaione dinamica dei progetti in base alla lista "progetti" importata da progData.js |=> passa l'id quando si fa click (gestione id indicata anche 
      nella root in main.jsx)  |==> recuperiamo l'id nella pagina project e lo usiamo per stampare i dati con riferimento sempre alla lista*/}
      <div id='projects' className="internCont ">
        <div className="textAndImg ">
          {
            progetti.map((el, index) => (
              <React.Fragment key={index}>
                <div className="servizi watch2 fade-in">
                  <p>00-{el.id}</p>
                  <Link to={`/project/${el.id}`}>{el.name}
                    {el.primacom? <span>*</span>:""}
                  </Link>
                  <span>
                    <p>{el.date}<br />{el.whatis}</p>
                  </span>
                </div>
                <img className="img" src={el.preimg} alt={el.whatis} />
              </React.Fragment>

            ))
          }
          <br /><br />
          <div className='d-flex gap-2'>
            <p className="asterisco">* Projects developed for Primacom S.r.l. </p>
            <p style={{fontSize: "10px"}}>see more on &nbsp;
              <HoverProvider>
                <TextHoverEff text={"GitHub"} goto={"https://github.com/foferys"} />
              </HoverProvider>
            </p>
          </div>

        </div>
      </div>

        
      {/* <OrizScrollingPage></OrizScrollingPage> */}
    </div>
    
    <span id="3d"></span>
    {/* <Canvas></Canvas> */}


    {/*     
    <div className="panel panel--white">
      <div className="container3d">
        <p className="watch2 fade-in">3D Modeling</p>
        <h2 className="watch2 fade-in title-med"> Shaping a tough world.<br/> </h2>

        <p className="watch2 fade-in subtitle">
        <b>3D modeling</b> is an incredibly versatile craft that can enhance web content in extraordinary ways. <br/><br/> 
        With my expertise and skills, I can design detailed and lifelike 3D models that bring an extra level of <b>engagement</b> 
        and <b>visual appeal</b> to websites, creating a more immersive experience for users.
        </p>
        <p className="watch2 fade-in ">
          <Link to={"/3d"} ><a className="orange-text link3d" style={{color: '#f56900 !important',}}>Step into my 3D world</a></Link>
        </p>

        <img className="img-big-center watch2 fade-in" src={fuji4} alt="prototipo fujifilm xe5"/>
        <img className="img-big-center2 watch2 fade-in" src={fuji} alt="prototipo fujifilm xe5 3D"/>

      </div>
    </div>  */}

    

  
  

    <div className="imgBox" ref={about}>
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
