import * as React from 'react';
import MainNavbar from '../component/layout/MainNavbar';
import BodyAbout from '../component/layout/BodyAbout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../index.css'
import Footer from '../component/layout/Footer';
import { useRef } from 'react';

export default function Home() {
    const theme = createTheme({
        typography: {
            "fontFamily": '"Montserrat", "sans-serif"',
        },
        palette: {
            primary: {
                main: '#161A30',
            },
            secondary: {
                main: '#31304D',
            },
            third: '#B6BBC4'
        }

    })
    return (
        <>
            <ThemeProvider theme={theme}>
                <div style={{minHeight: '80vh',}}>
                <MainNavbar />
                <BodyAbout />
                </div>
                <Footer />
            </ThemeProvider>
        </>
    );
}