import arrRight from '../img/arrow-right-solid.svg';


function Footer() {
    return (
        <>
        
        <footer id="footer">

            <div  id="footBox">
                <p className="watch2 fade-in">NON ASPETTARE ANCORA</p>
                <h2 className="watch2 fade-in">Costruiamo qualcosa di unico insieme.</h2>

                <a className="watch2 fade-in" href="mailto:gianpieroweno@hotmail.it">
                    <div id="roundBut">

                        <img src={arrRight} alt="" />
                    </div>
                    
                    Scrivimi ora.
                </a>
            </div>

            <div id="footerLinks">

                <p id="copy">© 2023 - <b> <a href="https://www.instagram.com/gianpieroferraro.ph/?hl=it" target="_blank">Gianpiero Ferraro</a></b></p>
                <div id="socials">
                    <p><a href="https://www.instagram.com/gianpieroferraro.ph/?hl=it" target="_blank">Instagram </a></p>
                    <p><a href="https://www.linkedin.com/in/gianpiero-ferraro/" target="_blank"> LinkedIn</a></p>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer;