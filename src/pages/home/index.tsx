import React from 'react';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { HTTPDetailMovie, HTTPNowPlaying, HTTPPopuler, HTTPUpComing } from '../../../utils/http';
import { ImageUrl } from '../../../utils/helper';
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
    const adakahDataMovie = useSelector((state: RootState) => state.detailMovie)

    const [visibleModal, setVisibleModal] = React.useState(false)
    const onOpenModal = () => setVisibleModal(true);
    const onCloseModal = () => setVisibleModal(false);

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

            // if (dataDetailMovie.length === 0 ) {
                // console.log('detailmovie = 0')
                const adddata = [...dataDetailMovie, resp]
                setDataDetailMovie(adddata)
            // } else {
            //     console.log('detailmovie = 1')
            //     // delete data 
            //     const dataMovie = [...dataDetailMovie];
            //     dataMovie.splice(0, 1);
            //     setDataDetailMovie(dataMovie)
            //     // add data
            //     const addMovie = [...dataMovie, resp]
            //     setDataDetailMovie(addMovie)
            // }
            onOpenModal()
        } catch (error) {
            console.log(error)
        }
    }
    
    React.useCallback(()=> {
        console.log(dataDetailMovie)
    }, [dataDetailMovie])

    
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
                                <button
                                    onClick={() => {
                                        httpDetailMovie(data.id)
                                    }}
                                    className="detail"
                                >
                                    Detail
                                </button>
                                <Modal 
                                    open={visibleModal} 
                                    onClose={() => {
                                        const dataMovie = [...dataDetailMovie];
                                        dataMovie.splice(0, 1);
                                        setDataDetailMovie(dataMovie)

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
                                            return(
                                                <div 
                                                    key={`idx-${index}`}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <img
                                                        style={{ height: '100%', width: '30%', objectFit: 'cover', objectPosition: 'center',pointerEvents: 'none' }}
                                                        src={`${ImageUrl}${item.poster_path}`}
                                                        alt={`${item.title} image`}
                                                    />

                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            width: '100%',
                                                            paddingLeft: '20px'
                                                        }}
                                                    >
                                                        <table>
                                                            <tbody>
                                                            <tr>
                                                                <td style={{width:'20%'}}>title</td>
                                                                <td style={{width: '10%'}}>:</td>
                                                                <td>{item.title}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{width:'20%'}}>genres</td>
                                                                <td style={{width: '10%'}}>:</td>
                                                                <td style={{
                                                                    display: 'inline-flex',
                                                                }}>
                                                                    {
                                                                        item.genres.map((item2: any, index: any) => {
                                                                            return (
                                                                                <div 
                                                                                    key={`id-${item2.id}`}
                                                                                    style={{
                                                                                        backgroundColor: 'red',
                                                                                        margin: '2px',
                                                                                        padding: '3px'
                                                                                    }}
                                                                                >
                                                                                    {item2.name}
                                                                                </div>
                                                                            );
                                                                        })
                                                                    }
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>

                                                        {/* <div>title: {item.title}</div>
                                                        <div 
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'row'
                                                            }}
                                                        >genres: {
                                                            item.genres.map((item2: any) => {
                                                                return(
                                                                    <div key={`id-${item2.id}`}>{item2.name}</div>
                                                                );
                                                            })
                                                        }</div> */}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </Modal>
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
