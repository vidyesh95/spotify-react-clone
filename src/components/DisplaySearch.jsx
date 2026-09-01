import {useState} from "react";
import Navbar from "./Navbar.jsx";
import {albumsData, songsData} from "../assets/assets.js";
import AlbumItem from "./AlbumItem.jsx";
import SongItem from "./SongItem.jsx";

const DisplaySearch = () => {
    const [query, setQuery] = useState("")
    const q = query.trim().toLowerCase()
    const match = (item) =>
        item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
    const albums = q ? albumsData.filter(match) : []
    const songs = q ? songsData.filter(match) : []

    return (
        <>
            <Navbar/>
            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What do you want to listen to?"
                className="w-full mt-4 px-4 py-2 rounded-full bg-[#242424] outline-none"
            />
            {!q && <p className="mt-6 text-[#a7a7a7]">Search for songs or albums.</p>}
            {q && albums.length === 0 && songs.length === 0 && (
                <p className="mt-6 text-[#a7a7a7]">No results for &quot;{query}&quot;.</p>
            )}
            {albums.length > 0 && (
                <div className="mb-4">
                    <h1 className="my-5 font-bold text-2xl">Albums</h1>
                    <div className="flex overflow-auto">
                        {albums.map((item) => (
                            <AlbumItem key={item.id} name={item.name} desc={item.desc} id={item.id}
                                       image={item.image}/>
                        ))}
                    </div>
                </div>
            )}
            {songs.length > 0 && (
                <div className="mb-4">
                    <h1 className="my-5 font-bold text-2xl">Songs</h1>
                    <div className="flex overflow-auto">
                        {songs.map((item) => (
                            <SongItem key={item.id} name={item.name} desc={item.desc} id={item.id}
                                      image={item.image}/>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default DisplaySearch
