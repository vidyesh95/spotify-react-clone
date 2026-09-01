import {useContext, useRef} from "react";
import {assets} from "../assets/assets";
import {useNavigate} from "react-router-dom";
import {PlayerContext} from "../context/PlayerContext.jsx";
import PlaylistList from "./PlaylistList.jsx";

const Sidebar = () => {
    const navigate = useNavigate()
    const {playlists} = useContext(PlayerContext)
    const dialogRef = useRef()

    return (
        <div className="hidden md:flex md:w-52 lg:w-[25%] h-full p-2 flex-col gap-2 text-white shrink-0">
            <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
                <div onClick={() => navigate('/')} className="flex items-center gap-3 pl-8 cursor-pointer">
                    <img className="w-6" src={assets.home_icon} alt="home"/>
                    <p className="font-bold">Home</p>
                </div>
                <div onClick={() => navigate('/search')} className="flex items-center gap-3 pl-8 cursor-pointer">
                    <img className="w-6" src={assets.search_icon} alt="search"/>
                    <p className="font-bold">Search</p>
                </div>
            </div>
            <div className="bg-[#121212] flex-1 rounded overflow-auto">
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img className="w-8" src={assets.stack_icon} alt="library"/>
                        <p className="font-semibold hidden lg:block">Your Library</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <img className="w-5" src={assets.arrow_icon} alt="Your Library"/>
                        <img onClick={() => dialogRef.current.showModal()} className="w-5 cursor-pointer"
                             src={assets.plus_icon} alt="Create playlist"/>
                    </div>
                </div>
                <PlaylistList dialogRef={dialogRef}/>
                {playlists.length === 0 && (
                    <div
                        className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
                        <h1>Lets find some podcast to follow</h1>
                        <p className="font-light">we will keep you updated on new episodes</p>
                        <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
                            Browse Podcast
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar;
