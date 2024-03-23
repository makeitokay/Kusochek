import React from 'react';
import { hide} from "../../../store/slices/modal";
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks";
import {StoryBlockType} from "../../../types/storyBlockType";
import {selectStoryIDArray} from "../../../store/slices/StorySlices/storyId";
import {setID} from "../../../store/slices/StorySlices/storyBlockID";

interface StoryBlockProps {
    storyBlock: StoryBlockType
    blockAction: Function
}

const PreviewBlock = ({storyBlock, blockAction}: StoryBlockProps) => {
    const {storyIDArray} = useAppSelector(selectStoryIDArray)
    const {stories: IDsByStoryBlock} = storyIDArray
    const dispatch = useAppDispatch()

    function openModal() {
        dispatch(setID(storyBlock.id))
        dispatch(hide(true))
    }

    return (
        <>
            {/*<div>*/}
            {/*    {IDsByStoryBlock[storyBlock.id]}*/}
            {/*</div>*/}
            <div className="story" style={{background: `url("${storyBlock.preview}") center/cover`}}
                 onClick={() => {
                     openModal()
                     blockAction(storyBlock.id)
                 }}/>
        </>
    );
};

export default PreviewBlock;