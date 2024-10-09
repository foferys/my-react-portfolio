import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Cursor from "../components/Cursor";
import AudioPlayer from "../components/Audio";
import BottomNav from "../components/BottomNav";
import stacco from "../img/stacco3.png";
import Canvas from "../components/Canvas";
import { useEffect, useRef } from "react";
import 'locomotive-scroll/dist/locomotive-scroll.css';
import gsap from "gsap";
import Loader from "../components/Loader";
import SwiperSlider from "../components/SwiperSlider";
import { useLocation } from "react-router-dom";



function Page3d() {
    const treDTitle = useRef(null);
    const treDpar = useRef(null);

    useEffect(() => {
        if (treDTitle.current || treDpar.current) { // Verifica se il riferimento è valido
            const tl = gsap.timeline({ defaults: { } });

            tl.fromTo(treDTitle.current, 
                { opacity: 0, y: "-20px" }, // Stato iniziale
                { 
                    opacity: 1, 
                    y: 0,
                    ease: "power3.inOut", 
                    delay: 0.3 // Ritardo prima dell'animazione
                }
            )
            .fromTo(treDpar.current, 
                { opacity: 0, y: "-20px" }, 
                { 
                    opacity: 1, 
                    y: 0,
                    ease: "power3.in", 


                }
            )
        }
    }, []);


    return (
        <>
            <div >

                <AudioPlayer></AudioPlayer>
                <Cursor></Cursor>
                <Navbar page3d={true}></Navbar>
                <BottomNav page3d={true}></BottomNav>
                <Loader></Loader>
            
                
                <div  id="tredtext">
                    <div  id="intro3d">
                        <h3 ref={treDTitle}>Fantasia Virtuale:Un Mondo di Possibilità</h3><br/>

                        <p className="" ref={treDpar}>
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
    

                <SwiperSlider></SwiperSlider>


                <Footer></Footer>
            </div>
        </>
    )
}

export default Page3d;