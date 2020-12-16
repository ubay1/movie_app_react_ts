import Axios from "axios";
import { AxiosNormal, ApiKey, BaseUrl } from "./helper";
import { nowPlaying, populer, detailMovie } from './interface';

export async function HTTPNowPlaying(param: nowPlaying) {
    try {
        const resp1 = await AxiosNormal(2000).get(`movie/now_playing?api_key=${ApiKey}&language=${param.language}&page=${param.page}`);
        return resp1.data.results
    } catch (error) {
        console.log(error.message)
    }
}

export async function HTTPPopuler(param: populer) {
    try {
        const resp1 = await AxiosNormal(2000).get(`movie/popular?api_key=${ApiKey}&language=${param.language}&page=${param.page}`);
        return resp1.data.results
    } catch (error) {
        console.log(error.message)
    }
}

export async function HTTPUpComing(param: populer) {
    try {
        const resp1 = await AxiosNormal(2000).get(`movie/upcoming?api_key=${ApiKey}&language=${param.language}&page=${param.page}`);
        return resp1.data.results
    } catch (error) {
        console.log(error.message)
    }
}

export async function HTTPDetailMovie(param: detailMovie) {
    // console.log(param)
    try {
        const resp1 = await AxiosNormal(2000).get(`${BaseUrl}movie/${param.movie_id}?api_key=${ApiKey}&language=${param.language}`)
        // console.log(resp1.data)
        return resp1.data
    } catch (error) {
        console.log(error.message)
    }
}