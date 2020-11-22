import Axios from "axios";
import { AxiosNormal, ApiKey } from "./helper";
import { nowPlaying } from './interface';

export async function HTTPNowPlaying(param: nowPlaying) {
    try {
        const resp1 = await AxiosNormal(2000).get(`movie/now_playing?api_key=${ApiKey}&language=${param.language}&page=${param.page}`);
        return resp1.data.results
    } catch (error) {
        console.log(error.message)
    }
}