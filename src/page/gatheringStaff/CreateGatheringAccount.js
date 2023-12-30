import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Grid,
    Button,
    IconButton,
    Badge,
} from '@mui/material';
import Navbar from '../../component/layout/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CreateGatheringAccountForm from "../../component/page/account/CreateGatheringAccountForm";
import Sidebar from "../../component/layout/Sidebar";

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

const CreateGatheringAccount = () => {

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Navbar />
                <div class="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                    <div class="drawer-content flex flex-col items-left">
                        <div class='m-10'>
                            <Typography variant='h4' fontWeight={700}>
                                Tạo tài khoản cho điểm tập kết
                            </Typography>

                            <CreateGatheringAccountForm />
                        </div>
                    </div>
                    <Sidebar />
                </div>
            </div>
        </ThemeProvider>
    );
};

export default CreateGatheringAccount;
