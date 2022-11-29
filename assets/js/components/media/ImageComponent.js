import React from 'react';
import styles from './media.module.css';

const ImageComponent =  (props) => {
    return (


        <React.Fragment>
            <div className={styles.data}>
                <a href={'http://images-assets.nasa.gov/image/'+props.href}>
                    <img className={styles.nasaImage}  src={'http://images-assets.nasa.gov/image/'+props.href}/></a>
                <h2>{props.title}</h2>
                <p>Date Created: {props.date_created}</p>
                <p>{props.description}</p>
                <h2>Protographer: {props.photographer}</h2>
                <p>Center: {props.center}</p>
                <p>Location: {props.location}</p>
            </div>

        </React.Fragment>


    )
};

export default ImageComponent;
