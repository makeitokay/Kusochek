export interface CartItem {
    quantityInCart: number,
    id: number,
    name: string,
    "price": number,
    "promotionPrice": number | null,
    "category": string,
    "imageUrl": string,
    "averageMark": number,
    "quantity": number
}