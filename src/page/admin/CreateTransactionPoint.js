import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
    Box,
    Paper,
    Typography,
    Grid, FormControl, InputLabel, Select, MenuItem,

} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddLocationIconAlt from '@mui/icons-material/AddLocationAlt'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import { FormProvider, RHFSelect, RHFTextField } from "../../component/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from '@mui/lab';
import Navbar from '../../component/layout/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createTransactionPoint, listGatheringPoints } from "../../api/point";

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


const defaultValues = {
    name: "",
    address: {
        street: "",
        zipcode: "",
        commune: "",
        district: "",
        province: ""
    },
    phone: "",
    email: "",
};

const validationSchema = yup.object().shape({
    name: yup.string().required('Tên địa điểm là bắt buộc'),
    address: yup.object().shape({
        street: yup.string().required('Địa chỉ là bắt buộc'),
        zipcode: yup.string().required('Mã địa điểm là bắt buộc'),
        commune: yup.string().required('Xã là bắt buộc'),
        district: yup.string().required('Quận/Huyện là bắt buộc'),
        province: yup.string().required('Tỉnh/TP là bắt buộc'),
    }),
    phone: yup.string().required('Số điện thoại là bắt buộc'),
    email: yup.string().email('Địa chỉ email không hợp lệ').required('Email là bắt buộc'),
});


const CreateGatheringPoint = () => {
    const [gatheringPoints, setGatheringPoints] = useState([])
    const [selectedPoint, setSelectedPoint] = useState('')

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await listGatheringPoints();
                const data = response?.map(item => (
                    {
                        id: item.id,
                        name: item.name
                    }
                ))
                setGatheringPoints(data);
            } catch (e) {
                console.log(e)
            }
        }

        fetchData();
    }, []);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    });


    const {
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = async (data) => {
        try {
            console.log(data);
            await createTransactionPoint(selectedPoint, data)
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <ThemeProvider theme={theme}>
            <div>
                <Navbar />
                <div class="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                    <div class="drawer-content flex flex-col items-left">
                        <div class='m-10'>
                            <Typography variant='h4' fontWeight={700}>
                                Tạo điểm giao dịch
                            </Typography>
                            <FormControl fullWidth>
                                <InputLabel id="select-gathering-label">Điểm tập kết</InputLabel>
                                <Select
                                    labelId="select-gathering-label"
                                    value={selectedPoint}
                                    label="Điểm tập kết"
                                    onChange={(e) => {
                                        setSelectedPoint(e.target.value)
                                    }}
                                >
                                    {
                                        gatheringPoints.map(i => (
                                            <MenuItem value={i.id}>{i.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                                <Box p={2}>
                                    <Paper elevation={3} style={{ padding: '20px' }}>
                                        <div class='m-5'>
                                            <Typography variant="h5" gutterBottom>
                                                Thông tin điểm giao dịch
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <RHFTextField name="name" label="Tên địa điểm" fullWidth />
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <RHFTextField name="address.street" label="Địa chỉ" fullWidth />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <RHFTextField name="address.zipcode" label="Mã bưu điện" fullWidth />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <RHFTextField name="address.commune" label="Xã" fullWidth />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <RHFTextField name="address.district" label="Quận/Huyện" fullWidth />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <RHFTextField name="address.province" label="Tỉnh/TP" fullWidth />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <RHFTextField name="phone" label="Điện thoại" fullWidth />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <RHFTextField name="email" label="Email" fullWidth />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div class='flex justify-end m-5'>
                                            <LoadingButton type="submit" loading={isSubmitting} variant="contained" color="primary">
                                                Tạo điểm giao dịch
                                            </LoadingButton>
                                        </div>
                                    </Paper>
                                </Box>
                            </FormProvider>
                        </div>
                    </div>
                    <div class="drawer-side">
                        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                        <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                            <li><a href='/dashboard'><SpaceDashboardIcon />Bảng điều khiển</a></li>
                            <li><a class="bg-neutral text-primary" href='/transaction/create'><AddLocationIcon />Tạo điểm giao dịch</a></li>
                            <li><a href='/gathering/create'><AddLocationIconAlt />Tạo điểm tập kết</a></li>
                            <li><a href='/manage-gatheringPoint'><LocationOnIcon />Quản lý điểm tập kết</a></li>
                            <li><a href='/manage-transactionPoint'><LocationOnIcon />Quản lý điểm giao dịch</a></li>
                            <li><a href='/create-account'><PersonAddIcon />Tạo tài khoản trưởng điểm</a></li>
                            <li><a href='/leader/manage'><ManageAccountsIcon />Quản lý tài khoản trưởng điểm</a></li>
                        </ul>

                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default CreateGatheringPoint;