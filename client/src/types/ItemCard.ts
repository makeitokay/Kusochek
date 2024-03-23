export interface ItemCard {
    "id": number,
    "name": string,
    "price": number,
    "promotionPrice": number,
    "category": string,
    "images": string[],
    "description": string,
    "averageMark": number,
    "weight": number,
    "reviews": Rew[]
}

export interface Rew {
    id: number,
    author: string,
    mark: number,
    reviewText: string
}

export interface Item {
    id: number,
    name: string,
    price: number,
    promotionPrice: number,
    category: string,
    image: string,
    averageMark: number
}
