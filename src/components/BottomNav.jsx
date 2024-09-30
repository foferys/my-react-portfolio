import fofeCover from '../assets/logo_fofeys.png';
import arrowup from '../img/arrowUp.svg';


function BottomNav() {
    return (
        
    <div className="header2 header2--visible">
        <div className="header_content">

            <div className="goBack goBack--visible">
                <a href="#header"><img src={arrowup} alt="torna su" /></a>
            </div>

            <a className="header_logo" href="">
                <img className="logo" src={fofeCover} alt="" />
            </a>
            <ul className="header_menu">
                <li><a href="#siti">Websites</a></li>
                <li><a href="#3d">3D</a></li>
                 {/* <li><a href="">Grafica</a></li>  */}
                <li><a href="#footer">Contatti</a></li>
            </ul>
        
        </div>

    </div>

    )
}

export default BottomNav;