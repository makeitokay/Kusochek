import React, {useEffect, useState} from 'react';
import VideoPlayer from "../videoPlayer/VideoPlayer";
import {StoryBlockType} from "../../../types/storyBlockType";
import {useAppSelector} from "../../../hooks/storeHooks";
import {selectStoryIDArray} from "../../../store/slices/StorySlices/storyId";
import {selectCurrentStoryBlockID} from "../../../store/slices/StorySlices/storyBlockID";

interface StoryProps {
    story: StoryBlockType
}

const Story = ({story}: StoryProps) => {
    const currentStoryBlockID = useAppSelector(selectCurrentStoryBlockID)
    const {storyIDArray} = useAppSelector(selectStoryIDArray)
    const {stories: IDsByStoryBlock} = storyIDArray
    const [videoUrl, setVideoUrl] = useState(story.videos[IDsByStoryBlock[story.id]])
    const [onPause, setOnPause] = useState(false)
    useEffect(() => {
        setVideoUrl(story.videos[IDsByStoryBlock[story.id]])
    }, [IDsByStoryBlock[story.id]])
    useEffect(() => {
        if (currentStoryBlockID === story.id) {
            setOnPause(true)
        } else {
            setOnPause(false)
        }
    }, [currentStoryBlockID])
    return (
        <VideoPlayer
            countVideos={story.videos.length}
            videoUrl={videoUrl}
            storyBlockID={story.id}
            onPause={onPause}
        />
    );
};

export default Story;