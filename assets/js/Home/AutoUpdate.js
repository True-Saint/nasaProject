import React, {Component} from 'react';
import axios from 'axios';
import logo from '../components/React-icon.svg';
import styles from '../components/dash.module.css';

class Dash extends Component{


    constructor(props) {
        super(props);
        this.state =
            { apods: [] };
    }


    componentDidMount() {
        this.axiosCancelSource = axios.CancelToken.source();


    }

    componentWillUnmount() {
        this.axiosCancelSource.cancel('Axios request canceled.');
    }

    syncApodData(){
        axios.get(`http://localhost:8000/api/apod`).then(response => {
            if(response === null){

            }else{
//                this.setState({apods: response.data});
                axios.post('http://localhost:8000/api/saveApod',{data: response.data[0]}).then( secondResponse =>{console.log(secondResponse)})
            }

        });


    }


    syncMarsWeatherData(){
        axios.get(`http://localhost:8000/api/marsweather`).then(response => {
            if(response === null){

            }else{
//                this.setState({apods: response.data});
                axios.post('http://localhost:8000/api/saveMWD',{data: response.data[0]}).then( secondResponse =>{console.log(secondResponse)})
            }

        });


    }

    render() {
        return(
            <div>

            </div>
        )
    }

}

export default Dash;
