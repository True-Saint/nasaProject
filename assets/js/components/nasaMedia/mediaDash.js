import React from 'react';
import styles from './nasaMedia.module.css';

const MediaDash =  (props) => {

    return (



            <div className={styles.dashMain}>
                <select id="year">
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2017">2018</option>
                    <option value="2017">2019</option>
                    <option value="2017">2020</option>
                </select>
                <h2>{props.title}</h2>
                <p>Date Created: {props.date_created}</p>
                <p>{props.description}</p>
                <h2>Protographer: {props.photographer}</h2>
                <p>Center: {props.center}</p>
                <p>Location: {props.location}</p>
            </div>




    )
};

export default MediaDash;