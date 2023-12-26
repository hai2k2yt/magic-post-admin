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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {FormProvider, RHFSelect, RHFTextField} from "../../component/hook-form";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {createOrder} from "../../api/order";
import { LoadingButton } from '@mui/lab';

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
        formState: {errors, isSubmitting},
    } = methods;

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'goods',
    });


    const onSubmit = async (data) => {
        try {
            console.log(data);
            await createOrder('2', data)
        }catch (e) {
            console.log(e);
        }
    };


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box p={2}>
                <Paper elevation={3} style={{padding: '20px'}}>
                    <Typography variant="h5" gutterBottom>
                        Người gửi
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <RHFTextField name="sender.name" label="Họ tên" fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField name="sender.phone" label="Điện thoại" fullWidth/>
                        </Grid>
                        <Grid item xs={8}>
                            <RHFTextField name="sender.address.street" label="Địa chỉ" fullWidth/>
                        </Grid>
                        <Grid item xs={4}>
                            <RHFTextField name="sender.address.zipcode" label="Mã bưu điện" fullWidth/>
                        </Grid>
                        <Grid item xs={4}>
                            <RHFTextField name="sender.address.commune" label="Xã" fullWidth/>
                        </Grid>
                        <Grid item xs={4}>
                            <RHFTextField name="sender.address.district" label="Quận/Huyện" fullWidth/>
                        </Grid>
                        <Grid item xs={4}>
                            <RHFTextField name="sender.address.province" label="Tỉnh/TP" fullWidth/>
                        </Grid>

                    </Grid>

                    <Typography variant="h5" gutterBottom>
                        Người nhận
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <RHFTextField name="receiver.name" label="Họ tên" fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <RHFTextField name="receiver.phone" label="Điện thoại" fullWidth/>
                        </Grid>
                        <Grid item xs={8}>
                            <RHFTextField name="receiver.address.street" label="Địa chỉ" fullWidth/>
                        </Grid>
                        <Grid item xs={4}>
                            <RHFTextField name="receiver.address.zipcode" label="Mã bưu điện" fullWidth/>
                        </Grid>
                        <Grid item xs={4}>
                            <RHFTextField name="receiver.address.commune" label="Xã" fullWidth/>
                        </Grid>
                        <Grid item xs={4}>
                            <RHFTextField name="receiver.address.district" label="Quận/Huyện" fullWidth/>
                        </Grid>
                        <Grid item xs={4}>
                            <RHFTextField name="receiver.address.province" label="Tỉnh/TP" fullWidth/>
                        </Grid>


                    </Grid>

                    <Typography variant="h5" gutterBottom style={{marginTop: '20px'}}>
                        Order
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <RHFSelect name="type" label="Loại hàng gửi">
                                <option value="DOCUMENT">Tài liệu</option>
                                <option value="GOOD">Hàng hóa</option>
                            </RHFSelect>
                        </Grid>
                        <Grid item xs={12}>
                            {fields.map((field, index) => (
                                <div style={{display: "flex", marginTop: 10}} key={field.id}>
                                    <RHFTextField name={`goods[${index}].name`} label="Tên" fullWidth/>
                                    <RHFTextField type="number" name={`goods[${index}].value`} label="Giá" fullWidth/>
                                    <RHFTextField name={`goods[${index}].attachDocument`} label="Tài liệu đi kèm" fullWidth/>
                                    <RHFTextField type="number" name={`goods[${index}].quantity`} label="Số lượng" fullWidth/>

                                    <IconButton onClick={() => remove(index)}>
                                        <RemoveIcon />
                                    </IconButton>
                                </div>
                            ))}

                            <Button
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
                            <RHFSelect name="senderInstructor" label="Chỉ dẫn khi không phát được bưu gửi">
                                <option value="IMMEDIATE_RETURN">Chuyển hoàn ngay</option>
                                <option value="CALL_SENDER">Gọi điện cho người gửi/BC gửi</option>
                                <option value="CANCEL">Hủy</option>
                                <option value="RETURN_BEFORE_DATE">Chuyển hoàn trước ngày</option>
                                <option value="RETURN_WHEN_STORAGE_EXPIRES">Chuyển hoàn khi hết thời gian lưu trữ</option>
                            </RHFSelect>
                        </Grid>

                        <Grid item xs={8}>
                            <RHFTextField name="specialService" label="Dịch vụ đặc biệt" style={{width: '100%'}}/>
                        </Grid>
                        <Grid item xs={8}>
                            <RHFTextField disabled name="sendTime" label="Thời gian gửi" style={{width: '100%'}}/>
                        </Grid>
                    </Grid>

                    <Typography variant="h5" gutterBottom style={{marginTop: '20px'}}>
                        Cước
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography>Người gửi</Typography>
                            <RHFTextField type="number" name="price.mainTax" label="Cước chính" fullWidth/>
                            <RHFTextField type="number" name="price.subTax" label="Phụ phí" fullWidth/>
                            <RHFTextField type="number" name="price.transportTax" label="Phí vận chuyển" fullWidth/>
                            <RHFTextField type="number" name="price.totalTax" label="Tổng cước" fullWidth/>
                            <RHFTextField type="number" name="price.otherTax" label="Cước khác" fullWidth/>
                            <RHFTextField type="number" name="price.totalPrice" label="Tổng thu" fullWidth/>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography>Người nhận</Typography>
                            <RHFTextField type="number" name="cashOnDelivery.cod" label="COD" fullWidth/>
                            <RHFTextField type="number" name="cashOnDelivery.other" label="Thu khác" fullWidth/>
                            <RHFTextField type="number" name="cashOnDelivery.totalCOD" label="Tổng thu" fullWidth/>
                        </Grid>
                    </Grid>

                    <Typography variant="h5" gutterBottom style={{marginTop: '20px'}}>
                        Khối lượng
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <RHFTextField type="number" name="actualWeight" label="Khối lượng thực tế" fullWidth/>
                        </Grid>
                        <Grid item xs={4}>
                            <RHFTextField type="number" name="volumetricWeight" label="Khối lượng quy đổi" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <RHFTextField name="businessInstructions" label="Hướng dẫn kinh doanh" fullWidth/>
                        </Grid>
                    </Grid>

                    <LoadingButton type="submit" loading={isSubmitting} variant="contained" color="primary" style={{marginTop: '20px'}}>
                        Tạo đơn gửi
                    </LoadingButton>
                </Paper>
            </Box>
        </FormProvider>
    );
};

export default CreateOrder;
