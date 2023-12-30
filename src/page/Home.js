import * as React from 'react';
import MainNavbar from '../component/layout/MainNavbar';
import Hero from '../component/layout/Hero';
import Category from '../component/layout/Category';

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
    const categoryRef = useRef(null);
    return (
        <>
            <ThemeProvider theme={theme}>
                <div >
                <MainNavbar />
                <Hero />
                <Category/>
            
                </div>
                <Footer />
            </ThemeProvider>
        </>
    );
}