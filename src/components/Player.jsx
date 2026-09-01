import {assets} from "../assets/assets.js";
import {useContext} from "react";
import {PlayerContext} from "../context/PlayerContext.jsx";

const Player = () => {

    const {seekBar, seekBg, playStatus, play, pause, track, time, previous, next, seekSong} = useContext(PlayerContext)

    return (
        <div className="h-[10%] min-h-16 bg-black flex justify-between items-center text-white px-2 md:px-4 shrink-0">
            <div className="flex items-center gap-2 md:gap-4 min-w-0 max-w-[42%] md:max-w-none md:w-1/4">
                <img className="w-10 md:w-12" src={track.image} alt="album cover"/>
                <div className="min-w-0">
                    <p className="truncate">{track.name}</p>
                    <p className="hidden sm:block text-sm">{track.desc.slice(0, 12)}</p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                <div className="flex gap-3 md:gap-4">
                    <img className="hidden sm:inline w-4 cursor-pointer" src={assets.shuffle_icon} alt="shuffle"/>
                    <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="previous"/>
                    {playStatus ?
                        <img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="pause"/> :
                        <img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon} alt="play"/>
                    }
                    <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="next"/>
                    <img className="hidden sm:inline w-4 cursor-pointer" src={assets.loop_icon} alt="loop"/>
                </div>
                <div className="flex items-center gap-2 md:gap-5 w-full justify-center">
                    <p>{time.currentTime.minute}:{time.currentTime.second}</p>
                    <div ref={seekBg} onClick={seekSong} className="w-[40vw] md:w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
                        <hr ref={seekBar} className="h-1 border-none w-0 bg-green-800 rounded-full"/>
                    </div>
                    <p>{time.totalTime.minute}:{time.totalTime.second}</p>
                </div>
            </div>
            <div className="hidden lg:flex items-center gap-2 opacity-75 w-1/4 justify-end">
                <img className="w-4 cursor-pointer" src={assets.plays_icon} alt="play"/>
                <img className="w-4 cursor-pointer" src={assets.mic_icon} alt="mic"/>
                <img className="w-4 cursor-pointer" src={assets.queue_icon} alt="queue"/>
                <img className="w-4 cursor-pointer" src={assets.speaker_icon} alt="speaker"/>
                <img className="w-4 cursor-pointer" src={assets.volume_icon} alt="volume"/>
                <div className="w-20 bg-slate-50 h-1 rounded">
                </div>
                <img className="w-4 cursor-pointer" src={assets.mini_player_icon} alt="floating player"/>
                <img className="w-4 cursor-pointer" src={assets.zoom_icon} alt="maximiz"/>
            </div>
        </div>
    )
}

export default Player
