export interface Movie {
    id: string,
    title: string,
    category: string
}

export const Movies: Movie[] = [
    {
        id: "1",
        title: "The Godfather",
        category: "drama"
    },
    {
        id: "2",
        title: "The Godfather - Part II",
        category: "drama"
    },
    {
        id: "3",
        title: "Dumb and dumber",
        category: "comedy"
    }
]
