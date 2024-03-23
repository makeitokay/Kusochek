export interface Filter{
    categories?: string[],
    minPrice?: number,
    maxPrice?: number,
    minWeight?: number,
    maxWeight?: number,
    query?: string,
    sortBy?: number,
    page?: number
}
