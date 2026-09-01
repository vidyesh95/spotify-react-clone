import {useContext, useRef} from "react";
import Navbar from "./Navbar.jsx";
import PlaylistList from "./PlaylistList.jsx";
import {PlayerContext} from "../context/PlayerContext.jsx";

const DisplayLibrary = () => {
    const {playlists} = useContext(PlayerContext)
    const dialogRef = useRef()

    return (
        <>
            <Navbar/>
            <div className="flex justify-between items-center mt-4">
                <h1 className="font-bold text-2xl">Your Library</h1>
                {playlists.length > 0 && (
                    <button type="button" onClick={() => dialogRef.current.showModal()}
                            className="px-4 py-1.5 bg-white text-black rounded-full text-[15px]">
                        Create Playlist
                    </button>
                )}
            </div>
            <div className="mt-4">
                <PlaylistList dialogRef={dialogRef}/>
            </div>
        </>
    )
}

export default DisplayLibrary
