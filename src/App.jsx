import Sidebar from "./components/Sidebar.jsx";
import Player from "./components/Player.jsx";
import Display from "./components/Display.jsx";
import MobileNav from "./components/MobileNav.jsx";
import {useContext} from "react";
import {PlayerContext} from "./context/PlayerContext.jsx";

const App = () => {

    const {audioRef, track} = useContext(PlayerContext)

    return (
        <div className="h-screen bg-black flex flex-col">
            <div className="flex-1 flex min-h-0">
                <Sidebar/>
                <Display/>
            </div>
            <MobileNav/>
            <Player/>
            <audio ref={audioRef} src={track.file} preload="auto">
            </audio>
        </div>
    )
}

export default App
