import {Route, Routes, useLocation} from "react-router-dom";
import DisplayHome from "./DisplayHome.jsx";
import DisplayAlbum from "./DisplayAlbum.jsx";
import DisplaySearch from "./DisplaySearch.jsx";
import DisplayPlaylist from "./DisplayPlaylist.jsx";
import DisplayLibrary from "./DisplayLibrary.jsx";
import {useEffect, useRef} from "react";
import {albumsData} from "../assets/assets.js";

const Display = () => {
    const displayRef = useRef()
    const location = useLocation();
    const isAlbum = location.pathname.includes("/album/")
    const albumId = isAlbum ? location.pathname.split("/").pop() : ""
    const album = isAlbum ? albumsData[Number(albumId)] : null

    useEffect(() => {
        if (album) {
            displayRef.current.style.background = `linear-gradient(${album.bgColor}, #121212)`
        } else {
            displayRef.current.style.background = `#121212`
        }
    }, [album]);

    return (
        <div ref={displayRef}
             className="flex-1 min-w-0 m-2 px-3 md:px-6 pt-4 rounded bg-[#121212] text-white overflow-auto">
            <Routes>
                <Route path="/" element={<DisplayHome/>}/>
                <Route path="/album/:id" element={<DisplayAlbum/>}/>
                <Route path="/search" element={<DisplaySearch/>}/>
                <Route path="/playlist/:id" element={<DisplayPlaylist/>}/>
                <Route path="/library" element={<DisplayLibrary/>}/>
            </Routes>
        </div>
    )
}

export default Display
