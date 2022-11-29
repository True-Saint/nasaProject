
import React, {Component} from 'react';
import axios from 'axios';


class apod extends Component {

    constructor() {
        super();

        this.state = { apod: [], loading: true};
    }

    componentDidMount() {
        this.getPosts();
    }



    getPosts() {
        let token = "xJZtgHeuyAPefgpZcyjlNKHCblzhzxkPSTKfDygr";
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=xJZtgHeuyAPefgpZcyjlNKHCblzhzxkPSTKfDygr`
/*            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }*/
        )
            .then(res => {
                this.setState({ apod: apod.data, loading: false })
        })

    }

    render() {
        console.log(this.getState({apod: apod.data}));
        const loading = this.state.loading;
        return(
            <div>
                <section className="row-section">
                    <div className="container">
                        <div className="row">
                            <h2 className="text-center"><span>List of users</span>Created with <i
                                className="fa fa-heart"></i> by yemiwebby</h2>
                        </div>
                        {loading ? (
                            <div className={'row text-center'}>
                                <span className="fa fa-spin fa-spinner fa-4x"></span>
                            </div>
                        ) : (
                            <div className={'row'}>
                                { this.state.apod.map(data =>

                                        <ul id="sortable">
                                            <li>
                                                <div className="media">
                                                    <div className="media-left align-self-center">

                                                    </div>
                                                    <div className="media-body">

                                                    </div>
                                                    <div className="media-right align-self-center">
                                                        <a href="#" className="btn btn-default">Contact Now</a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>

                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        )
    }

  /*  render() {
        const loading = this.state.loading;
        return (
            <div>
                <p>This is the apod</p>
                { this.state.apod.map(data =>
                    <div className="col-md-10 offset-md-1 row-block" key={data.date}>
                        <ul id="sortable">
                            <li>
                                <div className="media">
                                    <div className="media-left align-self-center">
                                        <img className="rounded-circle"
                                             src={data.url}/>
                                    </div>
                                    <div className="media-body">
                                        <h4>{data.title}</h4>
                                    </div>
                                    <div className="media-right align-self-center">
                                        <a href="#" className="btn btn-default">Contact Now</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

        )
    }*/
}
    export default apod;