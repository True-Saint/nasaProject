import React, {Component} from 'react';
import axios from 'axios';
import mrStyles from "../Mars Rover/marsrover.module.css";
import ttStyles from "./techtransfer.module.css";
import mainStyles from "../dash.module.css";
import logo from "../React-icon.svg";
import DOMPurify from "dompurify";
import techtransferData from "./techtransferData";
import TechtranferData from "./techtransferData";
import {Container} from "@mui/material";

class Techtransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tech: 'patent',
            data: {
                results: [],
                count: 0,

            },
            loading: true,
        };
        this.searchRef = React.createRef();
    //    this.searchRef = 'engine';
    }


    componentDidMount() {
        this.axiosCancelSource = axios.CancelToken.source();
        this.searchRef.current.focus();
        axios.get('https://localhost:8000/api/techtransfer').then(
            response => {
                this.setState({key: response.data});
                this.setState({loading: true}, this.callAPI);
            }
        )
    }
    setTech = (e) =>{
        const tech = e.target.value;
        this.setState({tech: tech, loading: true}, this.callAPI);
    }



    search = event => {
        event.preventDefault();
        this.setState({loading: true}, this.callAPI);
    }

    async callAPI() {
        const search = this.searchRef.current.value;
        if(search !== null && search !== '' && search !== undefined){
            let key = this.state.key;
            let tech = this.state.tech;
            let url = 'https://api.nasa.gov/techtransfer/'+tech+'/?'+search+'&api_key='+key;
            axios.get(url).then(response => {
                this.setState({data: response.data, loading: false});
            });
        }




    }

    render() {
    const tech = this.state.data.results.map((results, index) => {
        return (
            <TechtranferData
                key={index}
                uuid={results[0]}
                patentCode={results[1]}
                name={results[2]}
                description={results[3]}
                field={results[5]}
                researchCenter={results[9]}
                link={results[10]}
                numbers={results[12]}
            />
                )
        })



        return(

            <main>
                <form className={mrStyles.controls} onSubmit={this.search}>
                   <input ref={this.searchRef} type="text" defaultValue={"engine"}/>
                    <select id="rover" className={mrStyles.selector} onChange={e => this.setTech(e)} defaultValue={'patent'}>
                        <option value="patent">Patent</option>
                        <option value="patent_issued">Patent Issued</option>
                        <option value="software">Software</option>
                        <option value="spinoff">Spinoff</option>
                    </select>
                    <button>Search</button>
                </form>
                {this.state.data.results.length  && !this.state.loading ?
                   <Container maxWidth="xl">
                       {tech}
                   </Container>
                    :
                    <div className={mainStyles.loadingSection}>
                        <div className={mainStyles.loading}>
                            <img src={logo} className={mainStyles.spinnerLoad} alt="logo"/>
                            <small className={mainStyles.textGlow}>Loading Component...</small>
                        </div>
                    </div>
                }
            </main>

        )

    }
}
export default Techtransfer;
