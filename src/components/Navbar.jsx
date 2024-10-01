import { Link } from "react-router-dom";
import fofeCover from '../assets/logo_fofeys.png';

//(page3d) indica true o false che viene passato dal componente iniziale e decide giu cosa mostrare col ternario
function Navbar({page3d}) {
    

    return (
        <>
        
        <nav id="header" className="navbar navbar-expand-lg ">
            <div className="container-fluid">
                <a className="header_logo navbar-brand">
                    <Link to={"/"}>
                        <img className="logo" src={fofeCover} alt="" />
                    </Link>
                </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon navbar-dark"></span>
            </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* (page3d) --- ternario */}
                    {page3d ? (
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/"}>go back</Link>
                            </li>
                        </ul>
                    )
                    : (
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="./index.html">Home</a>
                            </li>
                            <li><a href="#siti">Websites</a></li>
                            <li><a href="#3d">3D</a></li>
                            {/* <li><a href="">Grafica</a></li> */}
                            <li><a href="#footer">Contatti</a></li>
                        </ul>
                    )}

                    
                </div>

                
            </div>
        </nav>
        </>
    )


}

export default Navbar;