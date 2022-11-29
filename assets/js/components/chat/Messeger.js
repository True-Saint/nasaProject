import React, {Component} from 'react';
import axios from 'axios';
import logo from '../React-icon.svg';
import styles from '../dash.module.css';
import ChatControls from "./chatControls";

class Messager extends Component{


    constructor(props) {
        super(props);
        this.state =
            { data:{
                name: '',
                message: ''},
                response: [],
                ws: null
            };

    }



    timeout = 250; // Initial timeout duration as a class variable

    /**
     * @function connect
     * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
     */
    connect = () => {
        var ws = new WebSocket("ws://localhost:3009");
        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");
               axios.get(`https://ipapi.co/json/`).then(response => {
                console.log(response.data);
                this.setState({clientInfo: response.data});
            });
            this.setState({ ws: ws });

            that.timeout = 250; // reset timer to 250 on open of websocket connection
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
        };

        ws.onmessage = e =>{
            console.debug("WebSocket message received:", JSON.parse(e.data));
            this.setState({ response: this.state.response.concat(JSON.parse(e.data)) });
        }

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };
    };

    /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
    check = () => {
        const { ws } = this.state.ws;
        if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };

    componentDidMount() {
        this.axiosCancelSource = axios.CancelToken.source();
        this.connect();
    }

    componentWillUnmount() {
        this.axiosCancelSource.cancel('Axios request canceled.');
    }

    changed = (e) => {
        let input = e.target.name
        let value = e.target.value
        switch (input) {
            case 'name':
                this.setState( prevState =>({
                    data:{
                        name: value,
                        message: prevState.data.message
                    }
                }))
                break;
            case 'message':
                this.setState( prevState =>({
                    data:{
                        name: prevState.data.name,
                        message: value
                    }
                }))
                break;
        }
    }

    render() {
        return(
            <ChatControls
                key={0}
                changed={e => this.changed(e)}
                send={e => this.send(e)}
                response={this.state.response}
                socket={this.state.ws}
                data={this.state.data}
            />
        )
    }

}

export default Messager;