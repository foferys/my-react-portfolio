import AudioPlayer from "../components/Audio";
import BottomNav from "../components/BottomNav";
import Cursor from "../components/Cursor";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import OrizScrollingPage from "../components/OrizScrollingPage";
import { ClickTermCatProvider } from "../store/ClickTermCatProvider";


function ProjDetail() {


    return(
        <>
            <AudioPlayer></AudioPlayer>
            <Cursor></Cursor>
            <ClickTermCatProvider>
                <Navbar page3d={true}></Navbar>
            </ClickTermCatProvider>
            <OrizScrollingPage></OrizScrollingPage>
            <BottomNav page3d={true}></BottomNav>
        </>
    )
}


export default ProjDetail;