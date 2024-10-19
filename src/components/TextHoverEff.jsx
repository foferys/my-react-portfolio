// import { useHover } from "../store/HoverContext"; //-> riferito all'altro modo di importare il context di textHover (commentato alla fine di quella pagina)
import { useContext } from "react";
import { HoverContext } from "../store/HoverContext";


function TextHoverEff({text, goto}) {

    // Uso il contesto per accedere allo stato e ai gestori degli eventi del contesto creato per i testi hoverati in HoverContext.jsx
    const {isHovered, handleMouseEnter, handleMouseLeave, hovText} = useContext(HoverContext);

    return(
        <>
        <a ref={hovText} class="toHov" href={goto} target="_blank"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                color: isHovered ? 'black' : '#224d3f',
                fontWeight:'bold',
                textDecoration: isHovered? "none !important":"underline !important",
            }}
            >

            {text}
        </a>

        </>
    )
}

export default TextHoverEff;