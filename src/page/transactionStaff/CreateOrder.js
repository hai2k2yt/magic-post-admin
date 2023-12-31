import React from 'react';
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
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { FormProvider, RHFSelect, RHFTextField } from "../../component/hook-form";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createOrder } from "../../api/order";
import { LoadingButton } from '@mui/lab';
import Navbar from '../../component/layout/Navbar';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import {useParams} from "react-router-dom";
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

const formatDatetime = new Intl.DateTimeFormat('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });

const defaultValues = {
    sender: {
        name: '',
        phone: '',
        address: {
            street: '',
            zipcode: '',
            commune: '',
            district: '',
            province: '',
        },
    },
    receiver: {
        name: '',
        phone: '',
        address: {
            street: '',
            zipcode: '',
            commune: '',
            district: '',
            province: '',
        },
    },
    type: 'GOOD',
    goods: [
        {
            name: '',
            value: 0,
            attachDocument: '',
            quantity: 0,
        }
    ],
    specialService: '',
    senderInstructor: 'CANCEL',
    sendTime: new Date().toISOString(),
    price: {
        mainTax: 0,
        subTax: 0,
        transportTax: 0,
        totalTax: 0,
        otherTax: 0,
        totalPrice: 0,
    },
    cashOnDelivery: {
        cod: 0,
        other: 0,
        totalCOD: 0,
    },
    actualWeight: 0,
    volumetricWeight: 0,
    businessInstructions: '',
};

const validationSchema = yup.object().shape({
    sender: yup.object().shape({
        name: yup.string().required('Tên người gửi là bắt buộc'),
        phone: yup.string().required('Số điện thoại người gửi là bắt buộc'),
        address: yup.object().shape({
            street: yup.string().required('Địa chỉ người gửi là bắt buộc'),
            zipcode: yup.string().required('Mã bưu điện người gửi là bắt buộc'),
            commune: yup.string().required('Xã người gửi là bắt buộc'),
            district: yup.string().required('Quận người gửi là bắt buộc'),
            province: yup.string().required('Tỉnh thành người gửi là bắt buộc'),
        }),
    }),
    receiver: yup.object().shape({
        name: yup.string().required('Tên người nhận là bắt buộc'),
        phone: yup.string().required('Số điện thoại người nhận là bắt buộc'),
        address: yup.object().shape({
            street: yup.string().required('Địa chỉ người nhận là bắt buộc'),
            zipcode: yup.string().required('Mã bưu điện người nhận là bắt buộc'),
            commune: yup.string().required('Xã người nhận là bắt buộc'),
            district: yup.string().required('Quận người nhận là bắt buộc'),
            province: yup.string().required('Tỉnh thành người nhận là bắt buộc'),
        }),
    }),
    type: yup.string().required('Loại là bắt buộc'),
    goods: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Tên hàng hóa là bắt buộc'),
            value: yup.number().required('Giá trị hàng hóa là bắt buộc'),
            attachDocument: yup.string(),
            quantity: yup.number().required('Số lượng là bắt buộc'),
        })
    ),
    specialService: yup.string(),
    senderInstructor: yup.string().required('Hướng dẫn gửi là bắt buộc'),
    sendTime: yup.string().required('Thời gian gửi là bắt buộc'),
    price: yup.object().shape({
        mainTax: yup.number().required('Thuế chính là bắt buộc'),
        subTax: yup.number().required('Thuế phụ là bắt buộc'),
        transportTax: yup.number().required('Thuế vận chuyển là bắt buộc'),
        totalTax: yup.number().required('Tổng thuế là bắt buộc'),
        otherTax: yup.number().required('Thuế khác là bắt buộc'),
        totalPrice: yup.number().required('Tổng giá là bắt buộc'),
    }),
    cashOnDelivery: yup.object().shape({
        cod: yup.number().required('COD là bắt buộc'),
        other: yup.number().required('Khác là bắt buộc'),
        totalCOD: yup.number().required('Tổng COD là bắt buộc'),
    }),
    actualWeight: yup.number().required('Trọng lượng thực là bắt buộc'),
    volumetricWeight: yup.number().required('Trọng lượng tính toán là bắt buộc'),
    businessInstructions: yup.string(),
});


const CreateOrder = () => {
    const id = localStorage.getItem('pointId')
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    });


    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'goods',
    });


    const onSubmit = async (data) => {
        try {
            await createOrder(id, data)
        }catch (e) {
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
                                Ghi nhận đơn của khách hàng
                            </Typography>
                            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                                <Box p={2}>
                                    <Paper elevation={3} style={{ padding: '20px' }}>
                                        <div class='m-5'>
                                            <Typography variant="h5" gutterBottom>
                                                Thông tin người gửi
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <RHFTextField name="sender.name" label="Họ tên" fullWidth required />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <RHFTextField name="sender.phone" label="Điện thoại" fullWidth required />
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <RHFTextField name="sender.address.street" label="Địa chỉ" fullWidth required />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <RHFTextField name="sender.address.zipcode" label="Mã bưu điện" fullWidth />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <RHFTextField name="sender.address.commune" label="Xã" fullWidth required />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <RHFTextField name="sender.address.district" label="Quận/Huyện" fullWidth required />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <RHFTextField name="sender.address.province" label="Tỉnh/TP" fullWidth required />
                                                </Grid>

                                            </Grid>
                                            <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                                                Thông tin người nhận
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <RHFTextField name="receiver.name" label="Họ tên" fullWidth required />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <RHFTextField name="receiver.phone" label="Điện thoại" fullWidth required />
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <RHFTextField name="receiver.address.street" label="Địa chỉ" fullWidth required />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <RHFTextField name="receiver.address.zipcode" label="Mã bưu điện" fullWidth />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <RHFTextField name="receiver.address.commune" label="Xã" fullWidth required />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <RHFTextField name="receiver.address.district" label="Quận/Huyện" fullWidth required />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <RHFTextField name="receiver.address.province" label="Tỉnh/TP" fullWidth required />
                                                </Grid>
                                            </Grid>

                                            <Typography variant="h5" gutterBottom style={{ marginTop: '20px', marginBottom: '20px' }}>
                                                Đơn hàng
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <RHFSelect name="type" label="Loại hàng gửi" required>
                                                        <option value="DOCUMENT">Tài liệu</option>
                                                        <option value="GOOD">Hàng hóa</option>
                                                    </RHFSelect>
                                                </Grid>
                                                <Grid item xs={10} justifyContent={'center'}>

                                                    {fields.map((field, index) => (
                                                        <Badge variant='dot' >

                                                            <div class='border-2 p-4 rounded border-secondary' style={{ display: "flex", marginTop: 10 }} key={field.id}>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={6}>
                                                                        <RHFTextField name={`goods[${index}].name`} label="Tên" fullWidth required />
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                        <RHFTextField type="number" name={`goods[${index}].value`} label="Giá" fullWidth required />
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                        <RHFTextField name={`goods[${index}].attachDocument`} label="Tài liệu đi kèm" fullWidth />
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                        <RHFTextField type="number" name={`goods[${index}].quantity`} label="Số lượng" fullWidth required />
                                                                    </Grid>
                                                                </Grid>

                                                            </div>
                                                            <HighlightOffIcon onClick={() => remove(index)} />
                                                        </Badge>
                                                    ))}

                                                    <Button
                                                        style={{ marginTop: '20px', marginBottom: '20px' }}
                                                        type="button"
                                                        onClick={() => append({ name: '', value: 0, attachDocument: '', quantity: 0 })}
                                                        startIcon={<AddIcon />}
                                                    >
                                                        Thêm hàng hóa
                                                    </Button>
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <RHFSelect name="senderInstructor" label="Chỉ dẫn khi không phát được bưu gửi" required>
                                                        <option value="IMMEDIATE_RETURN">Chuyển hoàn ngay</option>
                                                        <option value="CALL_SENDER">Gọi điện cho người gửi/BC gửi</option>
                                                        <option value="CANCEL">Hủy đơn hàng</option>
                                                        <option value="RETURN_BEFORE_DATE">Chuyển hoàn trước ngày</option>
                                                        <option value="RETURN_WHEN_STORAGE_EXPIRES">Chuyển hoàn khi hết thời gian lưu trữ</option>
                                                    </RHFSelect>
                                                </Grid>

                                                <Grid item xs={8}>
                                                    <RHFTextField name="specialService" label="Dịch vụ đặc biệt" style={{ width: '100%' }} />
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <RHFTextField disabled name="sendTime" label="Thời gian gửi" style={{ width: '100%' }} required />
                                                </Grid>
                                            </Grid>

                                            <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                                                Cước
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography>Người gửi</Typography>

                                                    <RHFTextField style={{ marginTop: '10px' }} type="number" name="price.mainTax" label="Cước chính" fullWidth required />
                                                    <RHFTextField style={{ marginTop: '10px', marginBottom: '10px' }} type="number" name="price.subTax" label="Phụ phí" fullWidth required />
                                                    <RHFTextField type="number" name="price.transportTax" label="Phí vận chuyển" fullWidth />
                                                    <RHFTextField style={{ marginTop: '10px', marginBottom: '10px' }} type="number" name="price.totalTax" label="Tổng cước" fullWidth required />
                                                    <RHFTextField type="number" name="price.otherTax" label="Cước khác" fullWidth required />
                                                    <RHFTextField style={{ marginTop: '10px' }} type="number" name="price.totalPrice" label="Tổng thu" fullWidth required />

                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Typography>Người nhận</Typography>

                                                    <RHFTextField style={{ marginTop: '10px' }} type="number" name="cashOnDelivery.cod" label="COD" fullWidth required />
                                                    <RHFTextField style={{ marginTop: '10px', marginBottom: '10px' }} type="number" name="cashOnDelivery.other" label="Thu khác" fullWidth required />
                                                    <RHFTextField type="number" name="cashOnDelivery.totalCOD" label="Tổng thu" fullWidth required />
                                                </Grid>
                                            </Grid>

                                            <Typography variant="h5" gutterBottom style={{ marginTop: '20px', marginBottom: '20px' }}>
                                                Khối lượng
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                                    <RHFTextField type="number" name="actualWeight" label="Khối lượng thực tế" fullWidth  required/>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <RHFTextField type="number" name="volumetricWeight" label="Khối lượng quy đổi" fullWidth required />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <RHFTextField name="businessInstructions" label="Hướng dẫn kinh doanh" fullWidth />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div class='flex justify-end m-5'>
                                            <LoadingButton type="submit" loading={isSubmitting} variant="contained" color="primary">
                                                Tạo đơn gửi
                                            </LoadingButton>
                                        </div>
                                    </Paper>
                                </Box>
                            </FormProvider>
                        </div>
                    </div>
                    <Sidebar />
                </div>
            </div>
        </ThemeProvider>
    );
};

export default CreateOrder;
