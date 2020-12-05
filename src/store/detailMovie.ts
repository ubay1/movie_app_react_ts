import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IDetailMovie {
    data: any[];
    // adult: boolean;
    // backdrop_path: string;
    // belongs_to_collection: any;
    // budget: number;
    // genres: string[];
    // homepage: string;
    // id: number;
    // imdb_id: string;
    // original_language: string;
    // original_title: string;
    // overview: string;
    // popularity: number;
    // poster_path: string;
    // production_companies: any[];
    // production_countries: any[];
    // release_date: string;
    // revenue: number;
    // runtime: number;
    // spoken_languages: any[]
    // status: string;
    // tagline: string;
    // title: string;
    // video: boolean;
    // vote_average: boolean;
    // vote_count: boolean;
}

const initialState: IDetailMovie = { 
    // adult: false,
    // backdrop_path: '',
    // belongs_to_collection: [],
    // budget: 0,
    // genres: [],
    // homepage: '',
    // id: 0,
    // imdb_id: '',
    // original_language: '',
    // original_title: '',
    // overview: '',
    // popularity: 0,
    // poster_path: '',
    // production_companies: [],
    // production_countries: [],
    // release_date: '',
    // revenue: 0,
    // runtime: 0,
    // spoken_languages: [],
    // status: '',
    // tagline: '',
    // title: '',
    // video: false,
    // vote_average: false,
    // vote_count: false,
    data: []
}

const SetDetailMovie = createSlice({
    name: 'detailMovie',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<IDetailMovie>) {
            // state.adult = action.payload.adult
            // state.backdrop_path = action.payload.backdrop_path
            // state.belongs_to_collection = action.payload.belongs_to_collection
            // state.budget = action.payload.budget
            // state.genres = action.payload.genres
            // state.homepage = action.payload.homepage
            // state.id = action.payload.id
            // state.imdb_id = action.payload.imdb_id
            // state.original_language = action.payload.original_language
            // state.original_title = action.payload.original_title
            // state.overview = action.payload.overview
            // state.popularity = action.payload.popularity
            // state.poster_path = action.payload.poster_path
            // state.production_companies = action.payload.production_companies
            // state.production_countries = action.payload.production_countries
            // state.release_date = action.payload.release_date
            // state.revenue = action.payload.revenue
            // state.runtime = action.payload.runtime
            // state.spoken_languages = action.payload.spoken_languages
            // state.status = action.payload.status
            // state.tagline = action.payload.tagline
            // state.title = action.payload.title
            // state.video = action.payload.video
            // state.vote_average = action.payload.vote_average
            // state.vote_count = action.payload.vote_count
            state.data = action.payload.data
        },
    },
})
export const { setData } = SetDetailMovie.actions
export default SetDetailMovie.reducer