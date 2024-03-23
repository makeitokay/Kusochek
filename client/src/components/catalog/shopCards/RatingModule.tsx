import React, {useState} from 'react';
import {Rating} from 'semantic-ui-react';
import {useParams} from "react-router-dom";
import {setRatingRequest} from "../../../HTTPRequests/item/setRatingRequest";
import {toast} from "react-toastify";

const RatingModule: React.FC = () => {
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const id = useParams()
    const notifyError = (message: string) => toast.error(message);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setRatingRequest(id.id|| "0", rating, comment).catch(()=>notifyError("Не удалось отправить отзыв"))
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label"></label>
                    <Rating
                        rating={rating}
                        maxRating={5}
                        onRate={(_, data) => setRating(data.rating as number)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="comment" className="form-label">Комментарий:</label>
                    <textarea
                        className="form-control"
                        id="comment"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{background:"black", borderRadius:0, border:"black"}}>Отправить</button>
            </form>
        </div>
    );
};

export default RatingModule;
    