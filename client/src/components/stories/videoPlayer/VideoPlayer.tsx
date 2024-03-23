import React, {useState} from 'react';
import ReactPlayer from "react-player";
import ProgressBarCustom from "./controlsElements/ProgressBar";
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks";
import {changeCurrentStoryID, selectStoryIDArray} from "../../../store/slices/StorySlices/storyId";
import "../../../styles/storyStyle.css"

interface VideoPlayerProps {
    videoUrl: string,
    countVideos: number,
    storyBlockID: number,
    onPause: boolean
}

const VideoPlayer = ({videoUrl, countVideos, storyBlockID, onPause}: VideoPlayerProps) => {
    console.log(onPause + " "+ storyBlockID)
    const {storyIDArray} = useAppSelector(selectStoryIDArray)
    const {stories: IDsByStoryBlock} = storyIDArray
    const dispatch = useAppDispatch()
    const [time, setTime] = useState<number>(0)
    const getProgress = (e: any) => {
        setTime(e.played)
    }

    function changeStory(e: any) {
        let x = e.clientX;
        let rect = e.target.getBoundingClientRect();
        let elemLeft = rect.left;
        let elemWidth = e.target.offsetWidth;

        if (x < elemLeft + elemWidth / 2) {
            if (IDsByStoryBlock[storyBlockID] > 0) {
                dispatch(changeCurrentStoryID({value: IDsByStoryBlock[storyBlockID] - 1, id: storyBlockID}))
            } else {
                dispatch(changeCurrentStoryID({value: IDsByStoryBlock[storyBlockID], id: storyBlockID}))
            }
            setTime(0)
        } else {
            if (IDsByStoryBlock[storyBlockID] < countVideos - 1) {
                dispatch(changeCurrentStoryID({value: IDsByStoryBlock[storyBlockID] + 1, id: storyBlockID}))
                setTime(0)
            }
        }
    }

    function setPlayed(number: number) {
        setTime(number)
    }

    // useEffect(()=>{
    //     setTemp(false)
    //     setTemp(true)
    // },[])
    return (
        <div
            style={{
                borderRadius: "25px",
                overflow: "hidden",
                width: "45vh", height: "80vh",
                position: "relative"
            }}
            onClick={(e) => changeStory(e)}
        >
            <ReactPlayer
                width="45vh"
                height="80vh"
                playing={onPause}
                url={videoUrl}
                onProgress={getProgress}
                progressInterval={1000}
                muted={true}
                pip = {false}
            >
            </ReactPlayer>
            <div className="videoPlayer" style={{position: "absolute", top: "1vh", left: "1vw", right: "1vw"}}>
                <ProgressBarCustom countVideos={countVideos} storyBlockID={storyBlockID}
                                   storyID={IDsByStoryBlock[storyBlockID]} time={time} setTime={setPlayed}/>
            </div>
        </div>
    );
};

export default VideoPlayer;