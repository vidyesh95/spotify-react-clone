import Navbar from "./Navbar.jsx";
import {useParams} from "react-router-dom";
import {albumsData, assets, songsData} from "../assets/assets.js";
import {useContext} from "react";
import {PlayerContext} from "../context/PlayerContext.jsx";


const DisplayAlbum = () => {
    const {id} = useParams()
    const albumData = albumsData[id]
    const {playWithId}= useContext(PlayerContext)

    return (
        <>
            <Navbar/>
            <div className="m-4 md:m-10 flex gap-4 md:gap-8 flex-col md:flex-row md:items-end">
                <img className="w-32 md:w-48 rounded" src={albumData.image} alt="Album"/>
                <div className="flex flex-col">
                    <p>Playlist</p>
                    <h2 className="text-3xl font-bold mb-4 md:text-5xl lg:text-7xl">{albumData.name}</h2>
                    <h4 className="text-lg text-slate-200">{albumData.desc}</h4>
                    <p className="mt-1">
                        <img className="inline-block w-5" src={assets.spotify_logo} alt="logo"/>
                        <b>Spotify</b>
                        · 1,323,154 likes
                        · <b>50 songs,</b>
                        about 3 hr 25 min
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p>
                    <b className="mr-4">
                        #
                    </b>
                    Title
                </p>
                <p className="hidden md:block">
                    Album
                </p>
                <p className="hidden lg:block">
                    Date Added
                </p>
                <img className="w-4 m-auto" src={assets.clock_icon} alt="clock"/>
            </div>
            <hr/>
            {
                songsData.map(
                    (item, index) => (
                        <div onClick={() => playWithId(item.id)} key={index} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer">
                            <p className="text-white truncate min-w-0">
                                <b className="mr-4 text-[#a7a7a7]">
                                    {index + 1}
                                </b>
                                <img className="inline w-10 mr-2 md:mr-5" src={item.image} alt="poster"/>
                                {item.name}
                            </p>
                            <p className="text-[15px] hidden md:block">
                                {albumData.name}
                            </p>
                            <p className="text-[15px] hidden lg:block">
                                5 days ago
                            </p>
                            <p className="text-[15px] text-center">
                                {item.duration}
                            </p>
                        </div>
                    )
                )
            }
        </>
    )
}

export default DisplayAlbum