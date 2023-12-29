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
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { FormProvider, RHFSelect, RHFTextField } from "../../component/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from '@mui/lab';
import Navbar from '../../component/layout/Navbar';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

import CreateGatheringAccountForm from "../../component/page/account/CreateGatheringAccountForm";

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
                    <div class="drawer-side">
                        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                        <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                            {/* <!-- Sidebar content here --> */}
                            <li><a href='/dashbroad/transaction'><SpaceDashboardIcon />Bảng điều khiển</a></li>
                            <li><a class="bg-neutral text-primary" href='/order/create'><AddCircleOutlineIcon />Ghi nhận hàng</a></li>
                            {/* <li><a href='/order/create'><SwapHorizIcon />Đơn mới</a></li> */}
                            <li><a href='/order/delivery/gathering'><AddIcon />Tạo đơn hàng đến điểm tập kết</a></li>
                            <li><a href='/order/delivery/customer' ><DeliveryDiningIcon/>Chuyển hàng đến người nhận</a></li>
                            <li><a href='/transaction/order'> <CheckIcon/> Xác nhận trạng thái đơn hàng</a></li>
                        </ul>

                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default CreateGatheringAccount;
