import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks";
import {addElements, selectModalActive} from "../../../store/slices/modal";
import Carousel from "react-multi-carousel";
import {StoryBlockType} from "../../../types/storyBlockType";
import Story from "./Story";
import {selectCurrentStoryBlockID, setID} from "../../../store/slices/StorySlices/storyBlockID";
import "../../../styles/caruselStyle.css"

interface StoryPlaceProps {
    carouselRef: React.MutableRefObject<Carousel | null>
    stories: StoryBlockType[]
}

const StoryPlace = ({carouselRef, stories}: StoryPlaceProps) => {
    const active = useAppSelector(selectModalActive)
    const dispatch = useAppDispatch()
    const storyBlockID = useAppSelector(selectCurrentStoryBlockID)
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 1
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 1
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 1
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };
    // const stories: StoryBlockType[] = [
    //     {
    //         preview: "https://w.forfun.com/fetch/da/daf8eb568fea522f6701fb9c66378cdc.jpeg",
    //         videos: ["https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
    //             "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4"],
    //         id: 0
    //     },
    //     {
    //         preview: "https://mobimg.b-cdn.net/v3/fetch/f4/f4e488ef69ea10573c0ce9cfbaf08643.jpeg",
    //         videos: ["https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4",
    //             "https://assets.mixkit.co/videos/preview/mixkit-red-frog-on-a-log-1487-large.mp4",
    //             "https://assets.mixkit.co/videos/preview/mixkit-cold-looking-fashion-woman-in-a-winter-environment-39879-large.mp4"
    //         ],
    //         id: 1
    //     },
    //     {
    //         preview: "https://mobimg.b-cdn.net/v3/fetch/f4/f4e488ef69ea10573c0ce9cfbaf08643.jpeg",
    //         videos: ["https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4",
    //             "https://assets.mixkit.co/videos/preview/mixkit-red-frog-on-a-log-1487-large.mp4",
    //             "https://assets.mixkit.co/videos/preview/mixkit-cold-looking-fashion-woman-in-a-winter-environment-39879-large.mp4"
    //         ],
    //         id: 2
    //     }
    // ]
    useEffect(() => {
        if (!active) {
            dispatch(setID(-1))
            if (carouselRef.current) {
                if (carouselRef.current.containerRef.current) {
                    carouselRef.current.containerRef.current.className = "react-multi-carousel-list  stories off"
                }
            }
        } else {
            if (carouselRef.current) {
                if (carouselRef.current.containerRef.current) {
                    carouselRef.current.containerRef.current.className = "react-multi-carousel-list  stories"
                }
            }
        }
    }, [active])

    function changeSlide(nextSlide: number) {
        console.log("нажал" + active + " " + storyBlockID)
        if (active) {
            if (carouselRef.current) {
                if (carouselRef.current.containerRef.current) {
                    carouselRef.current.containerRef.current.className = "react-multi-carousel-list  stories"
                }
            }
        }
        dispatch(setID(nextSlide))
    }

    useEffect(() => {
        dispatch(addElements(
            <div style={{width: "45vh", background: "gray", borderRadius: "25px"}}>
                <Carousel
                    className={`stories off`}
                    ref={carouselRef}
                    responsive={responsive}
                    beforeChange={(nextSlide) => {
                        changeSlide(nextSlide)
                    }}
                >
                    {stories.map(story => <Story story={story} key={story.id}/>)}
                </Carousel>
            </div>
        ))
    }, [])
    return (
        <>
            {/*{active}*/}
            {/*{storyBlockID}*/}
        </>
    );
};

export default StoryPlace;