
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
// import required modules
import { EffectCards } from 'swiper/modules';
import { useState, useEffect } from 'react';


function SwiperSlider() {
    
    // import delle foto nella cartella senza fare import una alla volta 
    const [imageArray, setImageArray] = useState([]);

    useEffect(() => {
        //import.meta.glob è una funzione di Vite che permette di caricare dinamicamente file all'interno di un progetto.
        // Vite restituirà: un oggetto con chiavi che rappresentano i percorsi dei file e valori che sono delle funzioni di importazione.
        const images = import.meta.glob('../img/3d/*.{jpg,jpeg,png,svg}'); 

        // Risolviamo tutte le promesse degli import dinamici
        /*Promise.all è una funzione JavaScript che prende un array di promesse (le operazioni asincrone che restituiranno un risultato in futuro) e 
        restituisce una singola promessa che viene risolta quando tutte le promesse nell'array sono risolte. Serve a fare in modo che tutte le immagini 
        vengano caricate prima di procedere. */
        Promise.all(
            /*Object.keys è una funzione JavaScript che restituisce un array contenente tutte le chiavi 
            di un oggetto. Nel nostro caso, queste chiavi sono i percorsi dei file delle immagini. */
            Object.keys(images).map(async (filePath) => {
                /*usiamo map per iterare su filePaths (i percorsi delle immagini) e creare un array di oggetti 
                che contengono l'URL dell'immagine e il testo alternativo. */
                const module = await images[filePath]();

                return {
                    /*Creiamo un oggetto per ogni immagine con src (il percorso dell'immagine) e alt (testo alternativo che rimuove il percorso 
                    e l'estensione del file). */
                    src: module.default, // Usa module.default per l'URL dell'immagine
                    alt: filePath.replace('../img/3d/', '').replace(/\.(png|jpe?g|svg)$/, ''),
                };
            })
        ).then(setImageArray); // Quando tutte le immagini sono state caricate, la funzione .then(setImageArray) viene eseguita e 
        //l'array di immagini viene salvato nello stato di React (setImageArray).

    }, []);


    return (
        <>
        <div className='swContainer'>

            <Swiper //swiper si usa cosi di default (vedi documentazione)
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]} //richiesto import del modulo sopra
                className="mySwiper "
            >
                {imageArray.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div>
                            <img src={image.src} alt={image.alt} />
                        </div>
                    </SwiperSlide>
                ))}
                
            </Swiper>
        </div>
        </>
    )
}

export default SwiperSlider;