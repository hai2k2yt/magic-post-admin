import * as React from 'react';
import MainNavbar from '../component/layout/MainNavbar';
import Header from '../component/layout/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../index.css'

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
        <ThemeProvider theme={theme}>
        <div>
            
                <MainNavbar />
                <Header />
            
        </div>
        </ThemeProvider>
        
    );
}