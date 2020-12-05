import React from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { HTTPDetailMovie } from '../../utils/http';
import axios from "axios";

interface IPropsModal {
    textButton: string;
    movie_id: number;
    onChange?: any;
}

export const ModalComp = (props: IPropsModal) => {
    const [dataDetailMovie, setDataDetailMovie] = React.useState([])
    
    // const [visibleModal, setVisibleModal] = React.useState(false)

    // const show = () => {
    //     console.log('test')
    //     setVisibleModal(true)
    // }

    // const hide = () => {
    //     setVisibleModal(false)
    // }

    const dataUserInput = {
        movie_id: props.movie_id,
        language: 'en-EN',
    }

    function waveHello() {
        detailMovie()
    }
    
    const detailMovie = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${props.movie_id}?api_key=582e10d63a109e22c925d875f715c562&language=${dataUserInput.language}`)

        // const parseData = JSON.parse(JSON.stringify(response.data))
        // setDataDetailMovie(response.data)
        props.onChange(response.data, true)
    }
    

    return (
        <button
            onClick={waveHello}
            className="detail"
        >
            {props.textButton}
        </button>
    );
};
