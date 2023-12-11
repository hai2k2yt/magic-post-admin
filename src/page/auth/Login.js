import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { TextField, Button, Paper, Typography, ThemeProvider } from '@mui/material';
import MainNavbar from '../../component/layout/MainNavbar';
import Footer from '../../component/layout/Footer';

const Login = () => {
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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Xử lý đăng nhập ở đây
    };
    
    return (
        <ThemeProvider theme={theme} >
            <div style={{minHeight: '80vh',}}>
            <MainNavbar />
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '300px', margin: 'auto', marginTop: '50px', position: 'sticky' }}>
                <Typography variant="h5">Đăng nhập</Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Mật khẩu"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="secondary" fullWidth onClick={handleLogin}>
                    Đăng nhập
                </Button>

            </Paper>
            </div>
            <Footer />
        </ThemeProvider >
    );
};

export default Login;