import React from 'react';
import styles from './marsrover.module.css';

const marsRoverPhoto =  (props) => {
    return (


        <React.Fragment>
            <div className={styles.marsRoverImageContainer}  key={props.id}>
                <h1>Rover: {props.name}</h1>
                <h4>Earth Date: {props.earth_date}</h4>
                <h4>Landing Date: {props.landing_date}</h4>
                <h4>Camera: {props.camera}</h4>
                <h4>Sol: {props.sol}</h4>
                <a href={props.src}> <img className={styles.mrimage} src={props.src}></img></a>
            </div>
        </React.Fragment>


    )
};

export default marsRoverPhoto;
