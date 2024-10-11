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
import { ClickTermCatContext, ClickTermCatProvider } from "../store/ClickTermCatProvider";



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
                {/* riferimento context per stato click logo cat */}
                <ClickTermCatProvider>
                    <Navbar page3d={true}></Navbar>
                </ClickTermCatProvider>
                <BottomNav page3d={true}></BottomNav>
                <Loader></Loader>
            
                <div id="tredtext">
                    <div id="intro3d">
                        <h3 ref={treDTitle}>Virtual Imagination: A World of Possibilities</h3><br/>

                        <p className="" ref={treDpar}>
                            My passion for <strong>art</strong> and <b>creativity</b> has driven me to dive into the world of 3D modeling using <b>Blender</b>. 
                            Throughout this journey, I've developed various models that have sharpened my skills, applying them to create and integrate 3D elements for 
                            <b>websites</b> and <b>online platforms</b>, enriching the overall user experience.
                            <br/><br/>
                            In the gallery below, you’ll find some of my latest <b>3D projects</b>, featuring design objects, characters, environments, and imaginative creations.
                        </p>
                    </div>
                    <img id="stacco" src={stacco} alt="divider"/>
                </div>


                <Canvas></Canvas>
    

                <SwiperSlider></SwiperSlider>


                <Footer></Footer>
            </div>
        </>
    )
}

export default Page3d;