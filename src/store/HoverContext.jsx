import { createContext, useContext, useState } from "react";
import { useRef, useEffect } from "react";


export const HoverContext = createContext();

export function HoverProvider({children}) {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    }
    const handleMouseLeave = () => {
        setIsHovered(false);
    }


    // creo un reference che passo anche tra le props value sotto
    const hovText = useRef(null)

    useEffect(() => { //--> implementazione animazione testo
        if(hovText.current) {
            
            const hovButs = document.querySelectorAll(".toHov");
            const elems = ["-","-","-","+","-","-", ];
            
            
            for (let i = 0; i < hovButs.length; i++) {

                const origntext = hovButs[i].innerHTML;

                hovButs[i].addEventListener("mouseenter", ()=> {
                    
                    const text = hovButs[i].innerHTML;

                    for (let x = 0; x < 7; x++) {
                        // console.log("sono al ciclo x:" + x)

                        if(x==0 || x == 3) {
                            setTimeout(() => {
                                let newWord = "";
                                for (let j = 0; j < text.length; j++) {
                                    
                                    let numCasuale = Math.floor(Math.random() * elems.length)
                                    newWord += elems[numCasuale];
                                    
                                    hovButs[i].innerHTML = newWord;
                                    
                                }
                            },x==0? 0:230)
                        }
                        if(x==1 || x == 4) {
                            setTimeout(() => {
                                let newWord = "";
                                for (let j = 0; j < text.length; j++) {

                                    let numCasuale = Math.floor(Math.random() * elems.length)
                                    if(numCasuale %2 ==0 || j %2==0) {

                                        newWord += elems[numCasuale];
                                        
                                    }else{
                                        newWord+=text[j]
                                    }
                                    
                                    hovButs[i].innerHTML = newWord;
                                }
                            },x==1? 120:270)
                        }
                        if(x==2|| x == 5) {
                            setTimeout(() => {
                                let newWord = "";
                                for (let j = 0; j < text.length; j++) {

                                    let numCasuale = Math.floor(Math.random() * elems.length)
                                    if(numCasuale %2 ==0 || j %2==0) {

                                        newWord += elems[numCasuale];
                                        
                                    }else{
                                        newWord+=text[i]
                                    }
                                    
                                    hovButs[i].innerHTML = newWord;
                                }
                            },x==2? 190:320)
                        }
                        if(x==6) {
                            setTimeout(() => {
                                hovButs[i].innerHTML = origntext;
                            },390)
                        }
                        
                    }
                    
                })

            
            }
        }
    }, [])

    return(
        <HoverContext.Provider value={{isHovered, handleMouseEnter, handleMouseLeave, hovText}}>
            {children}
        </HoverContext.Provider>
    )

}

// Un hook personalizzato per utilizzare il contesto
// export function useHover() {
//     return useContext(HoverContext);
// }