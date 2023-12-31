import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {
    Box,
    Paper,
    Typography,
    Grid,
} from '@mui/material';

import {FormProvider, RHFSelect, RHFTextField} from "../../../component/hook-form";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoadingButton} from '@mui/lab';

import {createTransactionLeader, createTransactionStaff} from "../../../api/user";
import {listTransactionPoints} from "../../../api/point";
import ROLES from "../../../page/auth/Role";

const pointId = localStorage.getItem('pointId')


const defaultValues = {
    username: "",
    email: "",
    password: "",
    phone: "",
    type: '',
    transactionPoint: pointId || ''

};

const validationSchema = yup.object().shape({
    username: yup.string().required('Tên là bắt buộc').matches(/(^[A-Za-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]{2,16})([ ]{0,1})([A-Za-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]{2,16})?([ ]{0,1})?([A-Za-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]{2,16})?([ ]{0,1})?([A-Za-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]{2,16})$/, "Tên không hợp lệ"),
    email: yup.string().required('Email là bắt buộc').email("Email không hợp lệ"),
    password: yup.string().required('Mật khẩu là bắt buộc').test(
        "regex",
        "Mật khẩu cần có tối thiểu 6 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
        val => {
          let regExp = new RegExp(
            "^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$"
          );
          console.log(regExp.test(val), regExp, val);
          return regExp.test(val);
        }
      ),
    confirmPassword: yup.string().required('Nhập lại mật khẩu là bắt buộc').oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
    phone: yup.string().required('Số điện thoại là bắt buộc').matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Số điện thoại không hợp lệ"),
    type: yup.string().required('Loại tài khoản là bắt buộc'),

    transactionPoint: yup.string().required('Điểm giao dịch là bắt buộc'),
});

const role = localStorage.getItem('role');


const CreateTransactionAccountForm = () => {
    const [points, setPoints] = useState([])

    useEffect(() => {
        async function fetchPoints() {
            try {
                const response = await listTransactionPoints();
                const data = response?.map(item => (
                    {
                        id: item.id,
                        name: item.name,
                        leaderId: item.transactionLeaderId
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
            if (data.type === 'TRANSACTION_LEADER') {
                const res = await createTransactionLeader(data.transactionPoint, body)
                console.log(res);
                alert('Tạo tài khoản thành công')
            } else if (data.type === "TRANSACTION_STAFF") {
                const res = await createTransactionStaff(data.transactionPoint, body)
                console.log(res);
                alert('Tạo tài khoản thành công')
            }
        } catch (e) {
            if (e.response.status === 400) {
                alert('Tài khoản đã tồn tại')
            }
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
                                <Typography>Nhập lại mật khẩu</Typography>
                                <RHFTextField type="password" name="confirmPassword" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Số điện thoại</Typography>
                                <RHFTextField name="phone" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Loại tài khoản</Typography>
                                <RHFSelect name="type">
                                    <option value="">Chọn</option>
                                    {role === ROLES[0] &&
                                        <option value="TRANSACTION_LEADER">Trưởng điểm giao dịch</option>}
                                    {role === ROLES[2] &&
                                        <option value="TRANSACTION_STAFF">Nhân viên giao dịch</option>}
                                </RHFSelect>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography>Điểm giao dịch</Typography>
                                <RHFSelect disabled={role !== ROLES[0]} name="transactionPoint">
                                <option value="">-- Chọn --</option>
                                    {points.filter(i => i.leaderId === null).map(i => (
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

export default CreateTransactionAccountForm;
