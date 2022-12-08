import React from 'react';
import ttStyles from "./techtransfer.module.css";
import DOMPurify from "dompurify";
import {createTheme, Paper, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({ palette: { mode: 'dark' } });

const TechtranferData =  (props) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Paper elevation={24} key={props.index} className={ttStyles.card}>
                <h4 className={ttStyles.price}>{props.patentCode}</h4>
                <p>{props.uuid}</p>
                <p>{props.name}</p>
                <p>{DOMPurify.sanitize(props.description,{ALLOWED_TAGS: ['<span', 'q'], ALLOWED_ATTR: ['style', 'class']})}</p>
                <p>Field: {props.field}</p>
                <p>Research Center: {props.researchCenter}</p>
                <a href={props.link}>{props.link}</a>
                <p>{props.numbers}</p>
            </Paper>
        </ThemeProvider>
    )
};

export default TechtranferData;
