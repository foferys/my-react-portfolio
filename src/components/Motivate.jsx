import { useEffect, useState } from "react";


function Motivate() {

    const [frase, setFrase] = useState("stocazzz");


    useEffect(() =>{

      

    }, [])

    const handleClick = (el) => {
        const f = document.querySelector("#fraseMotivazionale input").value;
        setFrase(f)
    }

    // guarda in reactmidali1
    const handleKeyDown =(e) => {
        if(e.key == "Enter") {
            handleClick();
        }
    }
 


    return(
        <>
            <div id="fraseMotivazionale">
                <input onKeyDown={handleKeyDown} type="text" name="" id="" />
                <p>{frase}</p>
            </div>
        
        </>
    )
}

export default Motivate;