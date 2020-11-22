import React from 'react';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import './style.scss';

import { HTTPNowPlaying } from '../../utils/http';
import { ImageUrl } from '../../utils/helper';

export function Home() {
    const [dataNowPlaying, setDataNowPlaying] = React.useState([])

    const dataUserInput = {
        language: 'en-EN',
        page: 1
    }

    React.useEffect(() => {
        try {
            HTTPNowPlaying(dataUserInput).then(res => { 
                const parseData = JSON.parse(JSON.stringify(res))
                setDataNowPlaying(parseData)
            });
        } catch (error) {
            console.log(error)
        }
    }, [dataNowPlaying])
    
    return(
    <div className="m-3">
        <div className="mb-3">
            <span className="rounded-md shadow-md bg-black p-2 font-bold text-white">Sedang Tayang</span>
        </div>
        <div className="flex overflow-x-scroll overflow-y-hidden">
        { 
            dataNowPlaying.map((data: any, i: number) => {
                return (
                    <div key={i + 1} className="pr-2 pb-2 relative">
                        <div className="bg_img" style={{}}>
                            <img 
                                style={{height: '100%', pointerEvents: 'none'}}
                                src={`${ImageUrl}${data.poster_path}`} 
                                alt={`${data.title} image`}
                            />
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
