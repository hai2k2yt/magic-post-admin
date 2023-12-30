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
import {FormProvider, RHFSelect, RHFTextField} from "../../../component/hook-form";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoadingButton} from '@mui/lab';

import {
    createGatheringLeader,
    createGatheringStaff,

} from "../../../api/user";
import {listGatheringPoints} from "../../../api/point";
import ROLES from "../../../page/auth/Role";


const defaultValues = {

    username: "",
    email: "",
    password: "",
    phone: "",
    type: '',
    gatheringPoint: ''

};

const validationSchema = yup.object().shape({
    username: yup.string().required('Tên user là bắt buộc'),
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: yup.string().required('Mật khẩu là bắt buộc'),
    phone: yup.string().required('Số điện thoại là bắt buộc'),
    type: yup.string().required('Loại tài khoản là bắt buộc'),
    gatheringPoint: yup.string().required('Điểm giao dịch là bắt buộc'),
});

const role = localStorage.getItem('role');

const CreateGatheringAccountForm = () => {
    const [points, setPoints] = useState([])

    useEffect(() => {
        async function fetchPoints() {
            try {
                const response = await listGatheringPoints();
                const data = response?.map(item => (
                    {
                        id: item.id,
                        name: item.name
                    }
                ))
                setPoints(data);
            } catch (e) {
                console.log(e)
            }
        }

        fetchPoints();
    }, []);


    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    });


    const {
        handleSubmit,
        formState: {errors, isSubmitting},
    } = methods;


    const onSubmit = async (data) => {
        const body = {
            username: data.username,
            email: data.email,
            password: data.password,
            phone: data.phone
        }
        try {
            if (data.type === 'GATHERING_LEADER') {
                const res = await createGatheringLeader(data.gatheringPoint, body)
            } else if (data.type === "GATHERING_STAFF") {
                const res = await createGatheringStaff(data.gatheringPoint, body)
            }
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box p={2}>
                <Paper elevation={3} style={{padding: '20px'}}>
                    <div class='m-5'>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography>Họ tên</Typography>
                                <RHFTextField name="username" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Email</Typography>
                                <RHFTextField name="email" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Mật khẩu</Typography>
                                <RHFTextField type="password" name="password" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Số điện thoại</Typography>
                                <RHFTextField name="phone" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Loại account</Typography>
                                <RHFSelect name="type">
                                    <option value="">Chọn</option>
                                    {role === ROLES[0] && <option value="GATHERING_LEADER">Trưởng điểm tập kết</option>}
                                    {role === ROLES[1] && <option value="GATHERING_STAFF">Nhân viên tập kết</option>}
                                </RHFSelect>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Điểm tập kết</Typography>
                                <RHFSelect name="gatheringPoint">
                                    <option value="">-- Chọn --</option>
                                    {points.map(i => (
                                        <option value={i.id}>{i.name}</option>
                                    ))}
                                </RHFSelect>
                            </Grid>
                        </Grid>
                    </div>
                    <div class='flex justify-end m-5'>
                        <LoadingButton type="submit" loading={isSubmitting} variant="contained" color="primary">
                            Tạo tài khoản
                        </LoadingButton>
                    </div>
                </Paper>
            </Box>
        </FormProvider>

    );
};

export default CreateGatheringAccountForm;
