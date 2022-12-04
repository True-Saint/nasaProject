'use-strict';
import React, {Component, useRef} from 'react';
import axios from 'axios';
import logo from '../React-icon.svg';
import styles from '../dash.module.css';
import mrStyles from './marsrover.module.css';
import MarsRoverPhotos from "./marsRoverPhotos";
import mainStyles from "../dash.module.css";
import DatePicker from 'react-datepicker/dist/react-datepicker';
import { parseISO, format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';


class MarsRover extends Component {


    constructor(props) {
        super(props);
        this.state =
            {
                key: null,
                data: {
                    photos: []
                },
                manifest: {
                    photo_manifest: {
                        max_date: parseISO(new Date()),
                        min_date: null
                    }
                },
                page: 1,
                hidden: false,
                loading: true,
                startDate: new Date(),
                rover: '',
                camera: ''
            };

        this.hidden = false;
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.axiosCancelSource = axios.CancelToken.source();
        axios.get('https://localhost:8000/api/marsrover').then(
            response => {
                this.setState({key: response.data});
                this.setState({loading: true}, this.callAPI);
            }
        )
    }
    hideControls(e){
        e.preventDefault();
        this.setState({hidden: !this.state.hidden})
    }
    handleChange(date) {
        this.setState({
            startDate: date,
            loading: true
        }, this.callAPI);
    }

    setCam(e){
        const cam = e.target.value;
        this.setState({camera: cam, loading: true}, this.callAPI);
    }
    setRover = (e) =>{
        const rover = e.target.value;
        this.setState({rover: rover, loading: true}, this.callAPI);
    }

    selectSwitch() {

        const selectedFeature = this.state.rover;

        switch(selectedFeature) {
            case 'curiosity':
                return (<select id="cam" className={mrStyles.selector} onChange={e => this.setCam(e)} defaultValue={'all'}>
                        <option value="all">All</option>
                        <option value="FHAZ">Front Hazard Avoidance Camera</option>
                        <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                        <option value="MAST">Mast Camera</option>
                        <option value="CHEMCAM">Chemistry and Camera Complex</option>
                        <option value="MAHLI">Mars Hand Lens Imager</option>
                        <option value="MARDI">Mars Descent Imager</option>
                        <option value="NAVCAM">Navigation Camera</option>
                    </select>
                );
            case 'opportunity':
                return (<select id="cam" className={mrStyles.selector} onChange={e => this.setCam(e)} defaultValue={'all'}>
                    <option value="all">All</option>
                    <option value="FHAZ">Front Hazard Avoidance Camera</option>
                    <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                    <option value="NAVCAM">Navigation Camera</option>
                    <option value="PANCAM">Panoramic Camera</option>
                    <option value="MINITES">Miniature Thermal Emission Spectrometer (Mini-TES)</option>
                </select>);
            case 'spirit':
                return (<select id="cam" className={mrStyles.selector} onChange={e => this.setCam(e)} defaultValue={'all'}>
                    <option value="all">All</option>
                    <option value="FHAZ">Front Hazard Avoidance Camera</option>
                    <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                    <option value="NAVCAM">Navigation Camera</option>
                    <option value="PANCAM">Panoramic Camera</option>
                    <option value="MINITES">Miniature Thermal Emission Spectrometer (Mini-TES)</option>
                </select>);
            default:
                return(<select id="cam" className={mrStyles.selector} onChange={e => this.setCam(e)} defaultValue={'all'}>
                    <option value="all">All</option>
                    <option value="FHAZ">Front Hazard Avoidance Camera</option>
                    <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                    <option value="MAST">Mast Camera</option>
                    <option value="CHEMCAM">Chemistry and Camera Complex</option>
                    <option value="MAHLI">Mars Hand Lens Imager</option>
                    <option value="MARDI">Mars Descent Imager</option>
                    <option value="NAVCAM">Navigation Camera</option>
                    <option value="PANCAM">Panoramic Camera</option>
                    <option value="MINITES">Miniature Thermal Emission Spectrometer (Mini-TES)</option>
                </select>);
        }
    }

    async callAPI() {

        let key = this.state.key;

        let date = this.state.startDate.toISOString().split('T')[0];
        let rover = this.state.rover;
        if (rover === '') rover = 'curiosity';
        let manifestUrl = 'https://api.nasa.gov/mars-photos/api/v1/manifests//' + rover + '?api_key=' + key;
        await this.callAsync(manifestUrl);
        let camera = '';
        if (this.state.camera === 'all' || this.state.camera === '') {
            camera = '';
        } else {
            camera = '&camera=' + this.state.camera
        }
        let url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?earth_date=' + date + camera + '&api_key=' + key;
        axios.get(url).then(response => {
            this.setState({data: response.data, loading: false});
        });


    }

    async callAsync(url){
     await axios.get(url).then(response =>{
         this.setState({manifest: response.data,loading: false});
     });
    }

    render() {
      let objectLength = Object.keys(this.state.manifest.photo_manifest).length;
        if (objectLength > 2) {
            const mrphotos = this.state.data.photos.map(data =>{
                return (
                    <MarsRoverPhotos
                        id={data.id}
                        key={data.id}
                        name={data.rover.name}
                        earth_date={data.earth_date}
                        landing_date={data.rover.landing_date}
                        sol={data.sol}
                        src={data.img_src}
                        camera={data.camera.full_name}
                    />
                );
            });

                return (
                    <main>
                        {this.state.hidden ?
                            <a href={"#"} className={mrStyles.show} onClick={e => this.hideControls(e)}>Show Controls</a>
                            :
                        <span className={mrStyles.controls}>
                          <a href={"#"} className={mrStyles.close} onClick={e => this.hideControls(e)}>Hide Controls</a>
                        <DatePicker
                            selected={ this.state.startDate }
                            onChange={ this.handleChange }
                            dateFormat="yyyy-MM-dd"
                            minDate={parseISO(this.state.manifest.photo_manifest.landing_date)}
                            maxDate={parseISO(this.state.manifest.photo_manifest.max_date)}
                        />
                        <select id="rover" className={mrStyles.selector} onChange={e => this.setRover(e)} defaultValue={'curiosity'}>
                            <option value="curiosity">Curiosity</option>
                            <option value="opportunity">Opportunity</option>
                            <option value="spirit">Spirit</option>
                        </select>
                                {this.selectSwitch()}
                            <p>Min Date: {this.state.manifest.photo_manifest.landing_date}</p>
                            <p>Max Date: {this.state.manifest.photo_manifest.max_date}</p>
                    </span>
                        }

                    {this.state.data.length !== 0 && !this.state.loading ?
                        <div className={mrStyles.mrOuterContainer}>
                          {mrphotos}
                        </div> :
                        <div className={styles.loadingSection}>
                            <div className={styles.loading}>
                                <img src={logo} className={styles.spinnerLoad} alt="logo" />
                                <small className={styles.textGlow}>Loading Component...</small>
                            </div>
                        </div>
                    }
                </main>)
        }else{
            return(
                <div className={styles.loadingSection}>
                    <div className={styles.loading}>
                        <img src={logo} className={styles.spinnerLoad} alt="logo" />
                        <small className={styles.textGlow}>Loading Component...</small>
                    </div>
                </div>
            )
        }


    }
}

export default MarsRover
