import React, {Component} from 'react';
import axios from 'axios';
import ApodComponent from './apodComponent';
import logo from '../React-icon.svg';
import styles from '../dash.module.css';

class Apod extends Component{


    constructor(props) {
        super(props);
        this.state =
            { apods: [] };
    }


    componentDidMount() {
        this.axiosCancelSource = axios.CancelToken.source();

        axios.get(`https://localhost:8000/api/apod`).then(response => {

            this.setState({apods: response.data});
            });
    }

    componentWillUnmount() {
        this.axiosCancelSource.cancel('Axios request canceled.');
    }

    render() {
    if (this.state.apods.length !== 0) {
        const map1 = this.state.apods.map(x =>{
            return <ApodComponent key={x.date} title={x.title} date={x.date} explanation={x.explanation} url={x.hdurl}/>;
        });

        return (
            <div>
                {map1}
            </div>
        )
    }else {

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

     isPrimitive(test) {
        return (test !== Object(test));
    };
}

export default Apod;
