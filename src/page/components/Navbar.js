import React from 'react'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { useState } from 'react';
import { createTheme } from '@mui/material/styles'
import { AppBar, Toolbar, Typography, Tabs, Tab, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
const theme = createTheme({
    palette: {
        secondary: {
            main: '#ffffff'
        }
    }
})

const Navbar = () => {
    const [keyword, setKeyword] = useState('');
    const [value, setValue] = useState('');
    const IconTextField = ({ iconStart, iconEnd, InputProps, ...props }) => {
        return (
            <TextField
                {...props}
                InputProps={{
                    ...InputProps,
                    startAdornment: iconStart ? (
                        <InputAdornment position="start">{iconStart}</InputAdornment>
                    ) : null,
                    endAdornment: iconEnd ? (
                        <InputAdornment position="end">{iconEnd}</InputAdornment>
                    ) : null
                }}
            />
        );
    };
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <AppBar>
                    <Toolbar>
                        <Typography
                            sx={{ fontWeight: '600', color: '#ffffff' }}
                        >MAGIC POST</Typography>
                        <Tabs value={value} onChange={(e, value) => setValue(value)}
                            textColor='inherit'
                            sx={{
                                flexGrow: 1,
                                margin: '0 10px',
                            }}
                            indicatorColor='secondary'>
                            <Tab label="Trang chủ" />
                            <Tab label="Giới thiệu" />
                        </Tabs>
                        <IconTextField label="Tìm kiếm" iconEnd={<SearchIcon />} sx={{ bgcolor: '#ffffff', margin: '10px', borderRadius: '16px' }} />


                        <Button
                            component={Link}
                            to="/login"
                            variant="contained"
                            color="primary"
                            sx={{
                                bgcolor: '#ffffff',
                                color: '#2d8fea',
                                '&:hover': {
                                    backgroundColor: '#ffffff',
                                    color: '#1a4da6',
                                }
                            }}>
                            Đăng nhập
                        </Button>
                    </Toolbar>
                </AppBar>
            </React.Fragment >
        </ThemeProvider>

    )
}

export default Navbar