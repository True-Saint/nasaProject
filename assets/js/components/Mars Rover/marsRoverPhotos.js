import React from 'react';
import styles from './marsrover.module.css';
import {createTheme, Paper, ThemeProvider} from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const darkTheme = createTheme({ palette: { mode: 'dark' } });
const marsRoverPhoto =  (props) => {
    return (


        <React.Fragment>
<ThemeProvider theme={darkTheme}>
            <Grid xs={2} sm={4} md={4}  elevation={24} className={styles.marsRoverImageContainer}  key={props.id}>
                    <Item elevation={24}>
                        <h1>Rover: {props.name}</h1>
                        <h4>Earth Date: {props.earth_date}</h4>
                        <h4>Landing Date: {props.landing_date}</h4>
                        <h4>Camera: {props.camera}</h4>
                        <h4>Sol: {props.sol}</h4>
                        <a href={props.src}> <img className={styles.mrimage} src={props.src}></img></a>

                    </Item>
            </Grid>
    </ThemeProvider>
        </React.Fragment>


    )
};

export default marsRoverPhoto;
