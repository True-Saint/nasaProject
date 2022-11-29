import React, {Component} from 'react';
import ChatComponentSend from './chatComponentSend';
import styles from './chatControls.module.css';

class chatControls extends Component{
    constructor(props) {
        super(props);
        this.state =
            {
                sent: [],
            };

    }
    sendMessage=()=>{
        const websocket = this.props.socket // websocket instance passed as props to the child component.

        try {
            const message = this.props.data
            console.log(message)
            websocket.send(JSON.stringify(message)) //send data to the server
            this.setState({ sent: this.state.sent.concat(message) });
        } catch (error) {
            console.log(error) // catch error
        }
    }

    render() {
        const chatSection = this.props.response.map( (value, index) => <ChatComponentSend key={index} messages={value}/>)
        return (
            <div className={styles.messageMain}>
                <div className={styles.chat}>
                {chatSection}
               </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input name={'name'} onChange={this.props.changed}/>
                </div>
                <div className={styles.formGroup}>
                    <input name={'message'} onChange={this.props.changed}/>
                    <button type="button" onClick={this.sendMessage} id={"sendBtn"}>Send</button>
                </div>

            </div>
        )
    }
};

export default chatControls;