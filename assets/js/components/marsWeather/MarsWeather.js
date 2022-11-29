import React, {Component} from 'react';
import axios from 'axios';
import logo from '../React-icon.svg';
import MarsWeatherData from './MarsWeatherData';

class MarsWeather extends Component{


    constructor(props) {
        super(props);
        this.state =
            { weather: [],
                solKeys: [],
                MW: {sol1:1,sol2:1,sol3:1,sol4:1,sol5:1,sol6:1,sol7:1},
                    sol1: {
                        504: {
                            AT: {av: -64.123, ct: 224460, mn: -93.61, mx: -6.657},
                            First_UTC: "2020-04-27T01:42:54Z",
                            HWS: {av: 4.624, ct: 102604, mn: 0.28300000000000003, mx: 15.030999999999999},
                            Last_UTC: "2020-04-28T02:22:28Z",
                            PRE: {av: 675.854, ct: 109066, mn: 650.8742, mx: 700.4725},
                            Season: "summer"
                        }
                    }
    };

    }


    componentDidMount() {
        this.axiosCancelSource = axios.CancelToken.source();

        axios.get(`https://localhost:8000/api/marsweather`).then(response => {

            let asdf = [];
            let asdf2 = [];
            const map = response.data.map(x =>{

                asdf.push(x.sol_keys);
                asdf2.push(x)
                console.log(x);
            });

            this.setState({
                weather: response.data,
                solKeys: asdf
            });
        });

    }
    componentWillUnmount() {
        this.axiosCancelSource.cancel('Axios request canceled.');
    }
    createTable() {
        const solArray = [...this.state.solKeys];
        let SolObject = [];
        const asdf = {...this.state.MW};

        solArray.map((x,i) =>{
          //  console.log(i);
            asdf.sol1 = x[0];
            asdf.sol2 = x[1];
            asdf.sol3 = x[2];
            asdf.sol4 = x[3];
            asdf.sol5 = x[4];
            asdf.sol6 = x[5];
            asdf.sol7 = x[6];
        })

       // console.log(asdf);
    }


    destrcuture({sol_keys,season}){
        return <MarsWeatherData key={sol_keys} solKey={sol_keys} Season={season} url={475}/>;
    }


    render() {
        if (this.state.weather.length !== 0) {

            this.createTable();

            this.state.solKeys.map((x,a,e) =>{

                let arr = [...this.state.weather];
                console.log(x)
                console.log(a)
                console.log(e)
                this.state.weather.map(data => {

 /*                   console.log('x = '+x);
                    console.log('data = '+data);
                    console.log(data);
                    console.log( 'data.x = '+data.x);*/
                })

            });

            const map = this.state.weather.map(x =>{
                return <MarsWeatherData key={x.sol_keys} solKey={x.sol_keys} Season={x.Season} url={475}/>;
            });
            return (
                <div>

                    {map}
                </div>
            )
        }else {

            return(
                <div className='loadingSection'>
                    <div className='loading'>
                        <img src={logo} className="spinnerLoad" alt="logo" />
                        <small>Loading Component...</small>
                    </div>
                </div>
            )
        }
    }


}

export default MarsWeather;
