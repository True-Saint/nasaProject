import React from 'react';
import styles from './media.module.css';

const PreviewComponent =  (props) => {
    return (


        <React.Fragment>
            <div key={props.index} ref={'image'+props.index} className={styles.nasaImageContainer} id={props.index}>
                    <a href={'#'} onClick={props.clickEvent}>
                        <img className={styles.nasaImagePreview} src={props.href}/>
                    </a>
            </div>
        </React.Fragment>


    )
};

export default PreviewComponent;
