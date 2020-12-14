import React from 'react';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { HTTPDetailMovie, HTTPNowPlaying, HTTPPopuler, HTTPUpComing } from '../../../utils/http';
import { ImageUrl } from '../../../utils/helper';
import { ModalComp } from '../../components/Modal';

import { Link } from 'react-router-dom';

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { RootState } from "../../store/rootReducers";
import { setData } from "../../store/detailMovie";

import ReactModal from 'react-modal';

import '../style.scss';

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
    const adakahDataMovie = useSelector((state: RootState) => state.detailMovie)

    const dataJson: any[] = []

    const [visibleModal, setVisibleModal] = React.useState(false)

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

    React.useEffect(() => {
        console.log(adakahDataMovie.data);
    }, [adakahDataMovie.data])

    const eventhandler = async (data: any, visible: boolean) => {
        // setDataDetailMovie(data)
        dispatch(setData({
            data: data
        }))
        setVisibleModal(visible)
    }

    const hide = () => {
        setVisibleModal(false)
    }

    
    return(
    <div className="m-3">
        <div className="mb-4">
            <span className=" shadow-md bg-black p-2 font-bold text-white">
                Now Playing

               
            </span>
                <Link to="/learn" className="bg-black p-2 font-bold text-white ml-2"> 
                goto learn
                </Link>
        </div>
        <div className="flex overflow-x-scroll overflow-y-hidden mb-5">
        { 
            dataNowPlaying.map((data: any, i: number) => {
                return (
                        <div key={`index ${i}`} className="pr-2 pb-2 relative">
                        <div className="bg_img" style={{}}>
                            <img 
                                style={{height: '100%', pointerEvents: 'none'}}
                                src={`${ImageUrl}${data.poster_path}`} 
                                alt={`${data.title} image`}
                            />
                            <div className="overlay_img">
                                <ModalComp 
                                    textButton="detail"
                                    movie_id={data.id}
                                    onChange={eventhandler}
                                />
                                <div className="watch">Watch Trailer</div>
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
                                    
                                    <div className="watch">Watch Trailer</div>
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
