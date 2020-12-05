import Axios, { AxiosInstance } from "axios";

export const BaseUrl  = 'https://api.themoviedb.org/3/';
export const ApiKey   = '582e10d63a109e22c925d875f715c562';
export const ImageUrl = 'https://image.tmdb.org/t/p/w500'

export function AxiosNormal<AxiosInstance>(timeout?: number) {
    let instance = Axios.create({
        baseURL: BaseUrl,
        timeout: timeout || 10 * 1000,
    });

    // Add a request interceptor
    instance.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error

        return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            // console.trace(error.response)
            let datak = error.response.data
            let txtErr = ""
            if (datak.name) {
                txtErr = datak.name + " || "
            }
            if (datak.message) {
                txtErr += datak.message
            } else if (datak.msg) {
                txtErr += datak.msg
            } else if (datak) {
                txtErr += datak
            }
            return Promise.reject("status:" + error.response.status + "|| msg:" + txtErr);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            // console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message);
        }
        console.trace("ndak tau errornya")
        return Promise.reject(error);
    });

    return instance
}