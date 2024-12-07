import {createContext, useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';
import {songsData} from "../assets/assets.js";

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {

    const audioRef = useRef()

    const seekBg = useRef()
    const seekBar = useRef()

    //default song is the first song in the array
    const [track, setTrack] = useState(songsData[1])
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

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100))
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
        pause
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
}

// PlayerContextProvider.propTypes = {
//     children: PropTypes.node.isRequired,
// };

export default PlayerContextProvider