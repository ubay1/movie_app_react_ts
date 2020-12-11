import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {judul} from '../../utils/interface';

export const Header: React.FC<judul> = ({ judulnya }) => (
    <div className="w-full bg-red-700 text-white text-4xl p-2 pl-3 mb-6 pr-3 font-bold">
        <Link to="/">{judulnya}</Link>
    </div>
);