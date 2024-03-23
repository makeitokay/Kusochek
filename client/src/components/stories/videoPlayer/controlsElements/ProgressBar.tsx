import React, {useEffect, useRef, useState} from 'react';
import {ProgressBar} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../../../hooks/storeHooks";
import {changeCurrentStoryID, selectStoryIDArray} from "../../../../store/slices/StorySlices/storyId";


interface ProgressBarCustomProps {
    countVideos: number
    storyID: number
    time: number
    storyBlockID: number
    setTime: Function
}

const ProgressBarCustom = ({countVideos, storyBlockID, storyID, time, setTime}: ProgressBarCustomProps) => {
        const [state, setState] = useState(0)
        const [classBar, setClassBar] = useState("")
        const ref = useRef<HTMLDivElement | null>(null)
        const {storyIDArray} = useAppSelector(selectStoryIDArray)
        const {stories: IDsByStoryBlock} = storyIDArray
        const dispatch = useAppDispatch()
        useEffect(() => {
            if (state < time) {
                setClassBar("active")
                setState(time)
            } else {
                setClassBar("")
                setState(time)
            }
            if (time === 1) {
                if (storyID < countVideos - 1) {
                    setTime(0)
                    dispatch(changeCurrentStoryID({value: IDsByStoryBlock[storyBlockID] + 1, id: storyBlockID}))
                }
            }
        }, [time])
        let array = Array.from(Array(countVideos).keys())

        return (
            <>
                <div style={{display: "flex"}}>
                    {array.map(i => {
                        if (i === storyID) {
                            return <ProgressBar className={classBar} ref={ref} now={time * 100} style={{
                                height: "5px",
                                minWidth: `${100 / countVideos}%`,
                                marginRight: `${i === countVideos - 1 ? "" : "2px"}`
                            }} onChange={() => console.log("change")}
                            />
                        }
                        if (i < storyID) {
                            return <ProgressBar ref={ref} now={100} style={{
                                height: "5px",
                                minWidth: `${100 / countVideos}%`,
                                marginRight: `${i === countVideos - 1 ? "" : "2px"}`
                            }}/>
                        }
                        return <ProgressBar now={0} style={{
                            height: "5px",
                            minWidth: `${100 / countVideos}%`,
                            marginRight: `${i === countVideos - 1 ? "" : "2px"}`
                        }}/>
                    })}
                </div>
            </>
        );
    }
;

export default ProgressBarCustom;