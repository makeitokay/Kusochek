import {$authHost} from "../index";

export async function setRatingRequest(productId: string, mark: number, reviewText: string) {
    const response = await $authHost.post(`/reviews/${productId}`, {mark: mark, reviewText: reviewText})
}
