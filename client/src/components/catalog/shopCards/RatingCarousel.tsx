// ReviewCarousel.tsx
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Rew} from "../../../types/ItemCard";

const responsive = {
    superLargeDesktop: {
        breakpoint: {max: 4000, min: 3000},
        items: 5,
    },
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 3,
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 2,
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1,
    },
};

interface ReviewCarouselProps {
    reviews: Rew[] | undefined;
}

const RatingCarousel: React.FC<ReviewCarouselProps> = ({reviews}) => {
    if (!reviews) {
        return <></>
    }
    return (
        <Carousel responsive={responsive}>
            {reviews.map((review) => (
                <div key={review.id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">Рейтинг: {review.mark}</h5>
                        <p className="card-text">{review.reviewText}</p>
                        <footer className="blockquote-footer">{review.author}</footer>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default RatingCarousel;
   