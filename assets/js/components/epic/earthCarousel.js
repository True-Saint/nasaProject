import React from 'react';
import mainStyles from "./epic.module.css";

const earthCarousel =  (props) => {
    return (


            <div className={`${mainStyles.slide} ${mainStyles.lmao} slide ${mainStyles.heroEpicImage}`}>
                <img className={mainStyles.epicImgFull} src={props.url}/>
            </div>


    )
};

export default earthCarousel;
