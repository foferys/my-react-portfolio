import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Cursor from "../components/Cursor";
import AudioPlayer from "../components/Audio";
import BottomNav from "../components/BottomNav";
import stacco from "../img/stacco3.png";
import Canvas from "../components/Canvas";


function Page3d() {
    return (
        <>
            <AudioPlayer></AudioPlayer>
            <Cursor></Cursor>
            <Navbar page3d={true}></Navbar>
            <BottomNav page3d={true}></BottomNav>
           
            
            <div id="tredtext">
                <div id="intro3d">
                    <h3>Fantasia Virtuale:Un Mondo di Possibilità</h3><br/>
                    <p className="">
                        La mia passione per l'<strong>arte</strong> e la <b>creatività</b>  mi ha ispirato a esplorare il mondo della modellazione 3D utilizzando <b>Blender</b>. 
                        Attraverso questa esperienza, ho creato diversi modelli che hanno contribuito a migliorare le mie abilità, applicando tali 
                        competenze nella realizzazione e l'implementazione di elementi 3D per <b>siti web</b> e <b>piattaforme online</b>, 
                        arricchendo così ulteriormente l'esperienza utente.
                        <br/><br/>
                        Nella galleria che segue, alcuni dei miei <b>progetti 3D</b> più recenti, che includono oggetti di design, 
                        personaggi, ambienti e oggetti di fantasia.
                        
                    </p>
                </div>
                <img id="stacco" src={stacco} alt="blocco"/>
            </div>

            <Canvas></Canvas>
  


            <div id="carouselExampleFade" className="carousel slide carousel-fade">
                <div className="carousel-inner">

                    
                    <div className="carousel-item active">
                        <img src="./src/img/3d/stanza.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="./src/img/3d/box.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    
                    <div className="carousel-item">
                        <img src="./src/img/3d/reusee.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    
                    <div className="carousel-item">
                        <img src="./src/img/3d/pepe.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="./src/img/3d/iphone.jpg" className="d-block w-100" alt="..."/>
                    </div>

                    <div className="carousel-item">
                        <img src="./src/img/3d/pneumatico pivelli.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    
                    <div className="carousel-item ">
                        <img src="./src/img/3d/mano7.jpg" className="d-block w-100" alt="..."/>
                    </div>

                    <div className="carousel-item ">
                        <img src="./src/img/3d/PEPERONCINO pub.jpg" className="d-block w-100" alt="..."/>
                    </div>

                    <div className="carousel-item ">
                        <img src="./src/img/3d/quadretto1.jpg" className="d-block w-100" alt="..."/>
                    </div>

                    <div className="carousel-item ">
                        <img src="./img/3d/fujifilm xe5 prototipo 10.png" className="d-block w-100" alt="..."/>
                    </div>

                    <div className="carousel-item ">
                        <img src="./img/3d/fujifilm xe5 prototipo 7.png" className="d-block w-100" alt="..."/>
                    </div>

                    <div className="carousel-item ">
                        <img src="./img/3d/FUJI XE5 PROT.png" className="d-block w-100" alt="..."/>
                    </div>

                    <div className="carousel-item ">
                        <img src="./img/3d/fujifilm xe5 prototipo 8.png" className="d-block w-100" alt="..."/>
                    </div>

                    <div className="carousel-item ">
                        <img src="./img/3d/FUJI XE5 PROT2.png" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item ">
                        <img src="./img/3d/vasetto con melanzane.jpg" className="d-block w-100" alt="..."/>
                    </div>

                    <div className="carousel-item ">
                        <img src="./img/3d/diva.jpg" className="d-block w-100" alt="..."/>
                    </div>

                    <div className="carousel-item ">
                        <img src="./img/3d/female shoe5.jpg" className="d-block w-100" alt="..."/>
                    </div>

                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <Footer></Footer>
        </>
    )
}

export default Page3d;