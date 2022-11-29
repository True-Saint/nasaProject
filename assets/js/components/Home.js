import React, {Component} from 'react';
import {Routes, Route,Navigate, Link, withRouter} from 'react-router-dom';
import Epic from './epic/Epic';
import Apod from './apod/Apod';
import MarsWeather from './marsWeather/MarsWeather.js';
import logo from './React-icon.svg';
import styles from './dash.module.css';
import apod from "./APOD";
import NasaMedia from "./nasaMedia/nasaMedia";
import Media from "./media/media";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state =
            { feature: null };
    }

    renderSwitch() {

       const selectedFeature = this.state.feature;

        switch(selectedFeature) {
            case 'apod':
                return <div className={styles.apodSection}>
                    <Apod></Apod>
                </div>;
            case 'epic':
                return <Epic></Epic>;
            case 'marsWeather':
                return <MarsWeather></MarsWeather>;
            case 'media':
                return (<NasaMedia></NasaMedia>);
            case 'media1':
                return (<Media></Media>);
            default:
                return <Apod></Apod>;
        }
    }


    nameChangedHandler(name){

        this.setState({feature: name});
    }

    render() {

        return (

            <div className={styles.DashMain}>
                <div className={styles.ControlPanel}>
                    <div className={styles.buttonSection}>
                        <button name={'apod'}
                                className={styles.ControlPanelButtons}
                                onClick={e => this.nameChangedHandler(e.target.name)}
                        >APOD</button>
                    </div>
                    <div className={styles.buttonSection}>
                        <button
                            name={'epic'}
                            className={styles.ControlPanelButtons}
                            onClick={e => this.nameChangedHandler(e.target.name)}
                        >Epic</button>
                    </div>
                    <div className={styles.buttonSection}>
                        <button
                            name={'media'}
                            className={styles.ControlPanelButtons}
                            onClick={e => this.nameChangedHandler(e.target.name)}
                        >Media</button>
                    </div>
                    <div className={styles.buttonSection}>
                        <button
                            name={'media1'}
                            disabled={this.state.loading}
                            className={styles.ControlPanelButtons}
                            onClick={e => this.nameChangedHandler(e.target.name)}
                        >New Media</button>
                    </div>
                    <div className={styles.buttonSection}>
                        <button   name={'marsWeather'}className={styles.ControlPanelButtons} onClick={e => this.nameChangedHandler(e.target.name)}>Mars Weather</button>
                    </div>




                </div>
                <div className={styles.MainContent}>
                      {this.renderSwitch()}
                </div>

        </div>
    )
    }
}

export default Home;
