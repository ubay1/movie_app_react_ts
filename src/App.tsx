import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {Header} from './components/header'
import {Home} from './pages/home/index'
import {Learn} from './pages/learn/index'

export default function App()
{
    return(
        <Router>
            <div>
                <Header judulnya="Movlix" />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/learn' component={Learn} />
                </Switch>
            </div>
        </Router>
    );
}