import React from 'react';
import mainStyles from "./epic.module.css";

const EpicNatural =  (props) => {
    return (

            <div className={mainStyles.epicCard}>
                <h1>{props.title}</h1>
                <p>{props.explanation}</p>
                <img className={mainStyles.epicImgThumb} src={props.url}/>
            </div>

    )
};

export default EpicNatural;