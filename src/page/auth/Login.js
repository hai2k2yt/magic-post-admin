import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Xử lý đăng nhập ở đây
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '300px', margin: 'auto', marginTop: '50px' }}>
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
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                Đăng nhập
            </Button>
            
        </Paper>

    );
};

export default Login;