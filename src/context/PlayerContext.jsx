import {createContext, useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';
import {songsData} from "../assets/assets.js";

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {

    const audioRef = useRef()

    const seekBg = useRef()
    const seekBar = useRef()

    //default song is the first song in the array
    const [track, setTrack] = useState(songsData[0])
    const [playStatus, setPlayStatus] = useState(false)
    const [time, setTime] = useState(
        {
            currentTime: {
                second: 0,
                minute: 0
            },
            totalTime: {
                second: 0,
                minute: 0
            }
        }
    )

    const play = () => {
        audioRef.current.play()
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause()
        setPlayStatus(false)
    }

    const playWithId = async (id) => {
        await setTrack(songsData[id])
        await audioRef.current.play()
        setPlayStatus(true)
    }

    const previous = async () => {
        if(track.id > 0) {
            await setTrack(songsData[track.id - 1])
            await audioRef.current.play()
            setPlayStatus(true)
        }
    }

    const next = async () => {
        if(track.id < songsData.length-1) {
            await setTrack(songsData[track.id + 1])
            await audioRef.current.play()
            setPlayStatus(true)
        }
    }

    const seekSong = async(event) => {
        audioRef.current.currentTime = ((event.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    const [playlists, setPlaylists] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("playlists")) || []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem("playlists", JSON.stringify(playlists))
    }, [playlists])

    const createPlaylist = (name) => {
        const id = Date.now().toString()
        setPlaylists((prev) => [...prev, {id, name, songIds: []}])
        return id
    }

    const addSongToPlaylist = (playlistId, songId) => {
        setPlaylists((prev) => prev.map((p) =>
            p.id === playlistId && !p.songIds.includes(songId)
                ? {...p, songIds: [...p.songIds, songId]}
                : p
        ))
    }

    const removeSongFromPlaylist = (playlistId, songId) => {
        setPlaylists((prev) => prev.map((p) =>
            p.id === playlistId
                ? {...p, songIds: p.songIds.filter((id) => id !== songId)}
                : p
        ))
    }

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100))+ "%"
                setTime(
                    {
                        currentTime: {
                            second: Math.floor(audioRef.current.currentTime % 60),
                            minute: Math.floor(audioRef.current.currentTime / 60)
                        },
                        totalTime: {
                            second: Math.floor(audioRef.current.duration % 60),
                            minute: Math.floor(audioRef.current.duration / 60)
                        }
                    }
                )
            }
        }, 1000)
    }, [audioRef]);

    const contextValue = {
        // Define your context values here
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        playlists,
        createPlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
}

PlayerContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PlayerContextProvider