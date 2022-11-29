import React from 'react';
import styles from './apod.module.css';

const ApodComponent = (props) => {
    return (
        <div className={styles.apod} >
            <div className={styles.apodPost} style={{backgroundImage: props.url}}>
                <img className={styles.apodImg} src={props.url}/>
                <div className={styles.overlay}>
                    <h1>{props.title}</h1>
                    <h1>{props.date}</h1>
                    <p>{props.explanation}</p>
                </div>
            </div>
        </div>
    )
};

export default ApodComponent;