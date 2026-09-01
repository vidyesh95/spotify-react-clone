import Navbar from "./Navbar.jsx";
import {useParams} from "react-router-dom";
import {assets, songsData} from "../assets/assets.js";
import {useContext} from "react";
import {PlayerContext} from "../context/PlayerContext.jsx";

const DisplayPlaylist = () => {
    const {id} = useParams()
    const {playlists, playWithId, addSongToPlaylist} = useContext(PlayerContext)
    const playlist = playlists.find((p) => p.id === id)
    const songs = playlist
        ? playlist.songIds.map((sid) => songsData.find((s) => s.id === sid)).filter(Boolean)
        : []
    const available = songsData.filter((s) => !playlist?.songIds.includes(s.id))

    const onAdd = (e) => {
        e.preventDefault()
        const songId = Number(e.target.song.value)
        if (Number.isNaN(songId)) return
        addSongToPlaylist(id, songId)
        e.target.reset()
    }

    if (!playlist) {
        return (
            <>
                <Navbar/>
                <p className="mt-6 text-[#a7a7a7]">Playlist not found.</p>
            </>
        )
    }

    return (
        <>
            <Navbar/>
            <div className="m-4 md:m-10 flex flex-col">
                <p>Playlist</p>
                <h2 className="text-3xl font-bold mb-2 md:text-5xl">{playlist.name}</h2>
                <p className="text-[#a7a7a7]">{playlist.songIds.length} songs</p>
            </div>
            {available.length > 0 && (
                <form onSubmit={onAdd} className="flex gap-2 mb-4">
                    <select name="song" required className="bg-[#242424] px-3 py-2 rounded flex-1 outline-none">
                        <option value="">Add a song</option>
                        {available.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                    <button type="submit" className="bg-white text-black px-4 rounded-full">Add</button>
                </form>
            )}
            {songs.length === 0 && (
                <p className="text-[#a7a7a7]">This playlist is empty.</p>
            )}
            {songs.length > 0 && (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 mt-4 mb-4 pl-2 text-[#a7a7a7]">
                        <p>
                            <b className="mr-4">#</b>
                            Title
                        </p>
                        <p className="hidden md:block">Album</p>
                        <img className="w-4 m-auto" src={assets.clock_icon} alt="clock"/>
                    </div>
                    <hr/>
                    {songs.map((item, index) => (
                        <div onClick={() => playWithId(item.id)} key={item.id}
                             className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer">
                            <p className="text-white truncate min-w-0">
                                <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                                <img className="inline w-10 mr-2 md:mr-5" src={item.image} alt="poster"/>
                                {item.name}
                            </p>
                            <p className="text-[15px] hidden md:block">{playlist.name}</p>
                            <p className="text-[15px] text-center">{item.duration}</p>
                        </div>
                    ))}
                </>
            )}
        </>
    )
}

export default DisplayPlaylist
