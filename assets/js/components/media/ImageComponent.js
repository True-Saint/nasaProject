import React from 'react';
import styles from './media.module.css';
import {Container, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";

const ImageComponent =  (props) => {
    return (


        <React.Fragment>

                <Paper elevation={24} sx={{padding: 10}}>
                <a href={'https://images-assets.nasa.gov/image/'+props.href}>
                    <img className={styles.nasaImage}  src={'https://images-assets.nasa.gov/image/'+props.href}/></a>
                <h2>{props.title}</h2>
                <p>Date Created: {props.date_created}</p>
                <Typography align={"center"} variant="p" component="p">{props.description}</Typography>
                    <Typography align={"center"} variant="p" component="p">Photographer: {props.photographer}</Typography>
                <p>Center: {props.center}</p>
                <p>Location: {props.location}</p>
                </Paper>


        </React.Fragment>


    )
};

export default ImageComponent;
