import React, {useEffect, useRef} from 'react';
import {StoryBlockType} from "../../types/storyBlockType";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PreviewBlock from "./storyComponents/PreviewBlock";
import StoryPlace from "./storyComponents/StoryPlace";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {selectStoryIDArray, setNewStoriesArray} from "../../store/slices/StorySlices/storyId";

const Stories = () => {
    const {storyIDArray} = useAppSelector(selectStoryIDArray)
    const {stories: IDsByStoryBlock} = storyIDArray
    const dispatch = useAppDispatch()
    const carouselRef = useRef<Carousel | null>(null);

    const stories: StoryBlockType[] = [
        
        {
            preview: "https://images.hdqwalls.com/download/digital-rain-3840x2400.jpg",
            videos: ["https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
                "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4"],
            id: 0
        },
        {
            preview: "https://gas-kvas.com/uploads/posts/2023-01/1673296966_gas-kvas-com-p-risunki-anime-v-stile-minimalizm-21.jpg",
            videos: ["https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4",
                "https://assets.mixkit.co/videos/preview/mixkit-red-frog-on-a-log-1487-large.mp4",
                "https://assets.mixkit.co/videos/preview/mixkit-cold-looking-fashion-woman-in-a-winter-environment-39879-large.mp4"
            ],
            id: 1
        },
        {
            preview: "https://images.wallpaperscraft.ru/image/single/baran_sledy_kudriavyj_66214_1920x1080.jpg",
            videos: ["https://assets.mixkit.co/videos/preview/mixkit-blogging-girl-down-the-street-with-his-cell-34487-large.mp4",
                "https://assets.mixkit.co/videos/preview/mixkit-behind-the-scenes-of-a-speaker-talking-on-camera-34486-large.mp4"
            ],
            id: 2
        },
        {
            preview: "https://images.wallpaperscraft.ru/image/single/kot_korobka_risunok_69262_2048x1152.jpg",
            videos: ["https://assets.mixkit.co/videos/preview/mixkit-white-marble-surface-with-gray-34498-large.mp4",
                "https://assets.mixkit.co/videos/preview/mixkit-texture-of-a-leather-surface-close-view-34499-large.mp4",
                "https://assets.mixkit.co/videos/preview/mixkit-close-view-of-denim-fabric-texture-34500-large.mp4"
            ],
            id: 3
        },
        {
            preview: "https://fonoteka.top/uploads/posts/2022-02/1643966347_49-phonoteka-org-p-fon-dlya-noutbuka-minimalizm-53.jpg",
            videos: ["https://assets.mixkit.co/videos/preview/mixkit-stacked-thin-strips-of-old-weathered-wood-34504-large.mp4"
            ],
            id: 4
        },
        {
            preview: "https://catherineasquithgallery.com/uploads/posts/2023-02/1676713533_catherineasquithgallery-com-p-risunki-na-zelenom-fone-181.jpg",
            videos: ["https://assets.mixkit.co/videos/preview/mixkit-young-man-skating-in-a-parking-lot-34550-large.mp4"
            ],
            id: 5
        }, {
            preview: "https://gas-kvas.com/uploads/posts/2023-02/1675450281_gas-kvas-com-p-otobrazhaetsya-tolko-fonovii-risunok-20.jpg",
            videos: ["https://assets.mixkit.co/videos/preview/mixkit-rolling-slowly-on-roller-skates-during-sunset-34547-large.mp4"
            ],
            id: 6
        }, {
            preview: "https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663461655_18-mykaleidoscope-ru-p-otkritki-minimalizm-vkontakte-20.jpg",
            videos: ["https://assets.mixkit.co/videos/preview/mixkit-excited-girl-with-a-stuffed-santa-claus-39747-large.mp4",
                "https://assets.mixkit.co/videos/preview/mixkit-father-and-daughter-sitting-on-the-floor-at-christmas-39753-large.mp4",
                "https://assets.mixkit.co/videos/preview/mixkit-white-flowers-in-the-breeze-1187-large.mp4",
                "https://assets.mixkit.co/videos/preview/mixkit-palm-tree-in-front-of-the-sun-1191-large.mp4",
                "https://assets.mixkit.co/videos/preview/mixkit-a-seagull-and-a-boat-at-sea-in-slow-motion-1200-large.mp4",
                "https://assets.mixkit.co/videos/preview/mixkit-blurred-purple-lights-bokeh-1175-large.mp4"
            ],
            id: 7
        }
    ]

    const goToSlide = (index: any) => {
        if (carouselRef.current) {
            // Доступ к методам карусели через ref
            (carouselRef.current as any).goToSlide(index);
        }
    };

    useEffect(() => {
        dispatch(setNewStoriesArray(new Array(stories.length).fill(0)))
    }, []);
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 7
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 7
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 3
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 3
        }
    };

    return (
        <div>
            <Carousel responsive={responsive}>
                {stories.map(story => {
                    return <PreviewBlock blockAction={goToSlide} key={story.id} storyBlock={story}/>
                })}
            </Carousel>
            <StoryPlace carouselRef={carouselRef} stories={stories}/>
        </div>
    );
};

export default Stories;