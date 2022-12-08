import React from "react";
import {Route, Routes} from "react-router-dom";
import Apod from "../components/apod/Apod";
import Epic from "../components/epic/Epic";
import Media from "../components/media/media";
import MarsRover from "../components/Mars Rover/MarsRover";
import Techtransfer from "../components/techtransfer/techtransfer";
import MarsWeather from "../components/marsWeather/MarsWeather";
import PhotoIcon from '@mui/icons-material/Photo';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PublicIcon from '@mui/icons-material/Public';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

export const links = [
    {
        endpoint: '/Apod',
        name: 'Apod',
        icon: <PhotoIcon/>
    },
    {
        endpoint: '/Epic',
        name: 'Epic',
        icon: <PublicIcon/>
    },
    { endpoint: '/Media', name: 'Media', icon: <PermMediaIcon/> },
    { endpoint: '/MarsRover', name: 'Mars Rover', icon: <AirportShuttleIcon/> },
    { endpoint: '/Techtransfer', name: 'Tech Transfer', icon: <DeveloperBoardIcon/> },
    { endpoint: '/MarsWeather', name: 'Mars Weather', icon: <BeachAccessIcon/> },
];

export function Pages() {
    return (
        <Routes>
            <Route exact path='/Nasa' element={<Apod></Apod>} />
            <Route exact path='/Apod' element={<Apod></Apod>} />
            <Route path='/Epic' element={<Epic></Epic>} />
            <Route path='/Media' element={<Media></Media>} />
            <Route path='/MarsRover' element={<MarsRover></MarsRover>} />
            <Route path='/Techtransfer' element={<Techtransfer></Techtransfer>} />
            <Route path='/MarsWeather' element={<MarsWeather></MarsWeather>} />
        </Routes>
    );
}
export default {links,Pages,};
