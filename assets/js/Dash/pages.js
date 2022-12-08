import React from "react";
import { Routes, Route } from "react-router-dom";
import Media from "../components/media/media";
import Techtransfer from "../components/techtransfer/techtransfer";
import Epic from '../components/epic/Epic';
import Apod from '../components/apod/Apod';
import MarsWeather from '../components/marsWeather/MarsWeather.js';
import MarsRover from '../components/Mars Rover/MarsRover';


function Pages() {
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
export default Pages;
