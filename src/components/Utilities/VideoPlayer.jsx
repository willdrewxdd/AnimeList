"use client"

import { useState } from "react"
import Youtube from "react-youtube"

const VideoPlayer = ({ youtubeId }) => {
    const [isOpen, setIsOpen] = useState(true)

    const handleVideoPlayer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const option = {
        width: "300",
        height: "250"
    }

    const Player = () => {
        return (
        <div className="fixed bottom-2 right-2">
            <button onClick={handleVideoPlayer} className="text-primary float-right bg-secondary px-3 mb-1"> 
              X 
            </button>
            <Youtube 
                videoId={youtubeId} 
                onReady={(event) => event.target.pauseVideo() }
                opts={option} 
                onError={() => alert("Video is Error")}/>
        </div>
        )
    }

    const ButtonOpenPlayer = () => {
        return (
            <button className="rounded fixed bottom-5 right-5 w-32 bg-primary text-dark hover:bg-accent transition-all shadow-xl" onClick={handleVideoPlayer}>
                Tonton Trailer
            </button>
        )
    }

    return isOpen ? <Player/> : <ButtonOpenPlayer/>
         
    
}

export default VideoPlayer