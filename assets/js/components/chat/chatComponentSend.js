import React from "react";
import styles from './chatComponent.module.css';

const ChatComponentSend = (props) => {
            return <p className={styles.message}>{props.messages.message}</p>
}

export default ChatComponentSend;