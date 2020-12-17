import React from 'react';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { HTTPDetailMovie, HTTPGetVideo, HTTPNowPlaying, HTTPPopuler, HTTPUpComing } from '../../../utils/http';
import { ImageUrl, VideoUrl } from '../../../utils/helper';
import { ModalComp } from '../../components/Modal';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { RootState } from "../../store/rootReducers";
import { setData } from "../../store/detailMovie";

import '../style.scss';
import './custom-overlay-modal.css';

import axios from 'axios';

interface IDetailMovie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: any;
    budget: number;
    genres: string[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: any[];
    production_countries: any[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: any[]
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: boolean;
    vote_count: boolean;
}

export function Home() {
    const dispatch: AppDispatch = useDispatch()
    const [dataNowPlaying, setDataNowPlaying] = React.useState([])
    const [dataPopuler, setDataPopuler] = React.useState([])
    const [dataUpComing, setDataUpComing] = React.useState([])
    const [dataDetailMovie, setDataDetailMovie] = React.useState([])
    const [dataVideo, setDataVideo] = React.useState([])
    const adakahDataMovie = useSelector((state: RootState) => state.detailMovie)

    const [visibleModal, setVisibleModal] = React.useState(false)
    const onOpenModal = () => setVisibleModal(true);
    const onCloseModal = () => setVisibleModal(false);

    const [visibleModal2, setVisibleModal2] = React.useState(false)
    const onOpenModal2 = () => setVisibleModal2(true);
    const onCloseModal2 = () => setVisibleModal2(false);


    const dataUserInput = {
        language: 'en-EN',
        page: 1
    }

    const populer = () => {
        try {
            HTTPPopuler(dataUserInput).then(res => {
                const parseData = JSON.parse(JSON.stringify(res))
                setDataPopuler(parseData)
            });
        } catch (error) {
            console.log(error)
        }
    }
    
    const NowPlaying = () => {
        try {
            HTTPNowPlaying(dataUserInput).then(res => {
                const parseData = JSON.parse(JSON.stringify(res))
                setDataNowPlaying(parseData)
            });
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        NowPlaying()
        populer()
    }, [])

    const httpDetailMovie = async (param: any) => {
        try {
            const resp = await HTTPDetailMovie({
                movie_id: param,
                language: 'en-US',
            });

            if (dataDetailMovie.length === 0 ) {
                // console.log('detailmovie = 0')
                const adddata = [...dataDetailMovie, resp]
                setDataDetailMovie(adddata)
            } else {
                // console.log('detailmovie = 1')
                // delete data 
                const dataMovie = [...dataDetailMovie];
                dataMovie.splice(0, 1);
                setDataDetailMovie(dataMovie)
                // add data
                const addMovie = [...dataMovie, resp]
                setDataDetailMovie(addMovie)
            }
            onOpenModal()
        } catch (error) {
            console.log(error)
        }
    }

    const ModalDetail = () => {
        return(
            <Modal
                open={visibleModal}
                onClose={() => {
                    // const dataMovie = [...dataDetailMovie];
                    // dataMovie.splice(0, 1);
                    // setDataDetailMovie(dataMovie)

                    onCloseModal()
                }}
                center
                closeOnOverlayClick={false}
                closeOnEsc={false}
                classNames={{
                    overlay: 'customOverlay'
                }}
            >
                {
                    dataDetailMovie.map((item: any, index: any) => {
                        return (
                            <div
                                key={`idx-${index}`}
                                className="flex justify-between"
                            >
                                <div className="flex flex-col w-1/4">
                                    <img
                                        className="h-64 w-full object-cover object-center pointer-events-none"
                                        src={`${ImageUrl}${item.poster_path}`}
                                        alt={`${item.title} image`}
                                    />

                                    <div
                                        className="shadow-md absolute p-2"
                                        style={{ backgroundColor: 'yellow' }}
                                    >{item.vote_average}</div>
                                </div>

                                <div
                                    className="flex flex-col w-full pl-8"
                                >
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="w-1/6 capitalize">title</td>
                                                <td className="w-3">:</td>
                                                <td className="m-1 p-1">{item.title}</td>
                                            </tr>
                                            <tr>
                                                <td className="w-1/6 capitalize">genres</td>
                                                <td className="w-3">:</td>
                                                <td className="grid grid-cols-3">
                                                    {
                                                        item.genres.map((item2: any, index: any) => {
                                                            return (
                                                                <div
                                                                    key={`id-${item2.id}`}
                                                                    className="bg-red-600 text-white
                                                                                    shadow-md m-1 p-1 flex items-center"
                                                                >
                                                                    {item2.name}
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="w-1/6 capitalize">production companies</td>
                                                <td className="w-3">:</td>
                                                <td className="grid grid-cols-3">
                                                    {
                                                        item.production_companies.length !== 0 ?
                                                            item.production_companies.map((item2: any, index: any) => {
                                                                return (
                                                                    <div
                                                                        key={`id-${item2.id}`}
                                                                        className="bg-black text-white
                                                                                shadow-md m-1 p-1 flex items-center"
                                                                    >
                                                                        {item2.name}
                                                                    </div>
                                                                );
                                                            }) :
                                                            <div
                                                                className="m-1 p-1 flex items-center"
                                                            >
                                                                not found
                                                                        </div>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="w-1/6 capitalize">release date</td>
                                                <td className="w-3">:</td>
                                                <td className="m-1 p-1">
                                                    {item.release_date}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="w-1/6 capitalize">status</td>
                                                <td className="w-3">:</td>
                                                <td className="m-1 p-1">
                                                    <span className="p-1 shadow-md"
                                                        style={{ backgroundColor: 'yellow' }}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="w-1/6 capitalize">deskripsi</td>
                                                <td className="w-3">:</td>
                                                <td className="m-1 p-1">
                                                    {item.overview}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })
                }
            </Modal>

        );
    }

    const httpGetVideo = async (param: any) => {
        try {
            const resp = await HTTPGetVideo({
                movie_id: param,
                language: 'en-US',
            });

            setDataVideo(resp.results)
            onOpenModal2()
        } catch (error) {
            console.log(error)
        }
    }

    const ModalVideo = () => {
        return (
            <Modal
                open={visibleModal2}
                onClose={() => {
                    onCloseModal2()
                }}
                center
                closeOnOverlayClick={false}
                closeOnEsc={false}
                classNames={{
                    overlay: 'customOverlay'
                }}
            >
                {
                    dataVideo.length !== 0 ?
                    dataVideo.map((item: any, index: any) => {
                        return (
                            <div className="mt-10 p-2 bg-gray-300" key={index}>
                                <iframe width="420" height="315"
                                    src={`${VideoUrl}${item.key}`}
                                />
                            </div>
                        );
                    })
                    :
                <div className="shadow-md bg-black p-2 font-bold text-white mt-10">Videos not found</div>
                }
            </Modal>

        );
    }
    
    React.useEffect(()=> {
        // console.log(dataDetailMovie)
        // console.log(dataVideo)
    }, [dataDetailMovie, dataVideo])

    
    return(
    <div className="m-3">
        <ModalDetail />
        <ModalVideo />

        <div className="mb-4">
            <span className=" shadow-md bg-black p-2 font-bold text-white">
                Now Playing

               
            </span>
                {/* <Link to="/learn" className="bg-black p-2 font-bold text-white ml-2"> 
                goto learn
                </Link> */}
        </div>
        <div className="flex overflow-x-scroll overflow-y-hidden mb-5">
        { 
            dataNowPlaying.map((data: any, i: number) => {
                return (
                        <div key={`index ${i}`} className="pr-2 pb-2 relative">
                        <div className="bg_img" style={{}}>
                            <img 
                                className="h-full pointer-events-none"
                                src={`${ImageUrl}${data.poster_path}`} 
                                alt={`${data.title} image`}
                            />
                            <div className="overlay_img">
                                <button
                                    onClick={() => {
                                        httpDetailMovie(data.id)
                                    }}
                                    className="detail"
                                >
                                    Detail
                                </button>
                                
                                {/* <ModalDetail /> */}
                                
                                <button
                                    onClick={() => {
                                        httpGetVideo(data.id)
                                    }}
                                    className="watch"
                                >
                                    Watch Trailer
                                </button>

                                {/* <ModalVideo /> */}
                            </div>
                        </div>

                        <div className="judul">
                            <div className="text">{data.title}</div>
                        </div>

                        <div className="rating">
                            <img src="../../assets/img/star.png" alt=""/>
                            {data.vote_average}
                        </div>
                        {/* <h2 className="bg-blue p-4">{i}</h2> */}
                    </div>
                )
            })
        }
        </div>

        <div className="mb-4">
            <span className=" shadow-md bg-black p-2 font-bold text-white">
                Populer
            </span>
        </div>
        <div className="flex overflow-x-scroll overflow-y-hidden">
            {
                dataPopuler.map((data: any, i: number) => {
                    return (
                        <div key={`index ${i}`} className="pr-2 pb-2 relative">
                            <div className="bg_img" style={{}}>
                                <img
                                    style={{ height: '100%', pointerEvents: 'none' }}
                                    src={`${ImageUrl}${data.poster_path}`}
                                    alt={`${data.title} image`}
                                />
                                <div className="overlay_img">
                                    <button
                                        onClick={() => {
                                            httpDetailMovie(data.id)
                                        }}
                                        className="detail"
                                    >
                                        Detail
                                    </button>

                                    {/* <ModalDetail /> */}

                                    <button
                                        onClick={() => {
                                            httpGetVideo(data.id)
                                        }}
                                        className="watch"
                                    >
                                        Watch Trailer
                                    </button>

                                    {/* <ModalVideo /> */}
                                </div>
                            </div>

                            <div className="judul">
                                <div className="text">{data.title}</div>
                            </div>

                            <div className="rating">
                                {data.vote_average}
                            </div>
                            {/* <h2 className="bg-blue p-4">{i}</h2> */}
                        </div>
                    )
                })
            }
        </div>
    </div>
    );
}
