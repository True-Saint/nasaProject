import React from 'react';
import styles from './nasaMedia.module.css';

const NasaVideosComponent =  (props) => {
    return (



        <div className={styles.data}>
            <video className={styles.nasaVideo} controls>
                <source src={'https://images-assets.nasa.gov/video/'+props.source} type="video/mp4"/>
            </video>
            <h2>{props.title}</h2>
            <p>Date Created: {props.date_created}</p>
            <p>{props.description}</p>
            <p>Center: {props.center}</p>
        </div>



    )
};

export default NasaVideosComponent;