import React from "react";
import styles from './chatComponent.module.css';

const ChatComponentReceive = (props) => {
    return <p className={styles.message}><section>{props.messages.name}</section>{props.messages.message}</p>
}

export default ChatComponentReceive;