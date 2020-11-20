import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {Header} from './components/Header'

export default function App()
{
    return(
        <Header />
    );
}