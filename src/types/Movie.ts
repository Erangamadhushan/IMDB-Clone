interface Movie {
    adult: boolean;
    backdrop_path?: string;
    id?: string | number | undefined;
    original_language?: string;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    video?: boolean;
    vote_average: number | undefined;
    vote_count?: number | undefined;
}
export type { Movie };