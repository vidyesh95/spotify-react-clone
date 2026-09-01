import {useContext, useRef} from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {PlayerContext} from "../context/PlayerContext.jsx";

const PlaylistList = ({dialogRef}) => {
    const {playlists, createPlaylist} = useContext(PlayerContext)
    const localRef = useRef()
    const dialog = dialogRef || localRef
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value.trim()
        if (!name) return
        const id = createPlaylist(name)
        e.target.reset()
        dialog.current.close()
        navigate(`/playlist/${id}`)
    }

    return (
        <>
            <dialog ref={dialog} className="bg-[#242424] text-white p-6 rounded-lg m-auto border-0">
                <form onSubmit={onSubmit} className="flex flex-col gap-3">
                    <p className="font-semibold">Create playlist</p>
                    <input
                        name="name"
                        required
                        autoFocus
                        placeholder="Playlist name"
                        className="px-3 py-2 rounded bg-[#121212] outline-none"
                    />
                    <div className="flex gap-2 justify-end">
                        <button type="button" onClick={() => dialog.current.close()}
                                className="px-3 py-1 text-sm">Cancel
                        </button>
                        <button type="submit" className="px-4 py-1.5 bg-white text-black rounded-full text-[15px]">
                            Create
                        </button>
                    </div>
                </form>
            </dialog>
            {playlists.length === 0 ? (
                <div
                    className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
                    <h1>Create your first playlist</h1>
                    <p className="font-light">its easy we will help you</p>
                    <button type="button" onClick={() => dialog.current.showModal()}
                            className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
                        Create Playlist
                    </button>
                </div>
            ) : (
                <ul>
                    {playlists.map((p) => (
                        <li key={p.id} onClick={() => navigate(`/playlist/${p.id}`)}
                            className="p-3 m-2 rounded cursor-pointer hover:bg-[#ffffff26]">
                            <p className="font-semibold">{p.name}</p>
                            <p className="text-sm text-[#a7a7a7]">{p.songIds.length} songs</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

PlaylistList.propTypes = {
    dialogRef: PropTypes.shape({current: PropTypes.any}),
};

export default PlaylistList
