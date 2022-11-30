import React, {Component} from 'react';
import axios from 'axios';
import logo from '../React-icon.svg';
import styles from '../dash.module.css';
import mrStyles from './marsrover.module.css';
import MarsRoverPhotos from "./marsRoverPhotos";
import mainStyles from "../dash.module.css";



class MarsRover extends Component {


    constructor(props) {
        super(props);
        this.state =
            {
                key: null,
                data: {
                    photos: []
                },
                page: 1,
                year: 2015,
                month: 1,
                day: 1,
                loading: true
            };
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


    callAPI(){
      //  let year = this.state.year;
      //  let page = this.state.page;
        let key = this.state.key;
        let url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key='+key;

        console.log(url);
        axios.get(url).then(response => {
            this.setState({data: response.data,loading: false});
        });
    }

    render() {
        if (this.state.data.length !== 0) {
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
                    />
                );
            });
            if(this.state.loading){
                return (<div className={mainStyles.loadingSection}>
                    <div className={mainStyles.loading}>
                        <img src={logo} className={mainStyles.spinnerLoad} alt="logo"/>
                        <small className={mainStyles.textGlow}>Loading Component...</small>
                    </div>
                </div>);
            }else {
                return (
                    <div className={mrStyles.mrOuterContainer}>
                        {mrphotos}
                    </div>
                )
            }

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
