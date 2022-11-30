import React from 'react';
import styles from './marsrover.module.css';

const marsRoverPhoto =  (props) => {
    return (


        <React.Fragment>
            <div className={styles.marsRoverImageContainer}  key={props.id}>
                <h1>Rover: {props.name}</h1>
                <p>Earth Date: {props.earth_date}</p>
                <h4>Landing Date: {props.landing_date}</h4>
                <p>Sol: {props.sol}</p>
                <img className={styles.mrimage} src={props.src}></img>
            </div>
        </React.Fragment>


    )
};

export default marsRoverPhoto;
