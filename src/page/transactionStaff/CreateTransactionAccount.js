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
import {FormProvider, RHFSelect, RHFTextField} from "../../component/hook-form";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoadingButton} from '@mui/lab';
import Navbar from '../../component/layout/Navbar';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import {createTransactionLeader, createTransactionStaff} from "../../api/user";
import {listGatheringPoints, listTransactionPoints} from "../../api/point";
import CreateTransactionAccountForm from "../../component/page/account/CreateTransactionAccountForm";
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
const defaultValues = {

    username: "",
    email: "",
    password: "",
    phone: "",
    type: '',
    transactionPoint: ''

};

const validationSchema = yup.object().shape({
    username: yup.string().required('Tên user là bắt buộc'),
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: yup.string().required('Mật khẩu là bắt buộc'),
    phone: yup.string().required('Số điện thoại là bắt buộc'),
    type: yup.string().required('Loại tài khoản là bắt buộc'),
    transactionPoint: yup.string().required('Điểm giao dịch là bắt buộc'),
});


const CreateTransactionAccount = () => {
    const [points, setPoints] = useState([])

    useEffect(() => {
        async function fetchPoints() {
            try {
                const response = await listTransactionPoints();
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
            if (data.type === 'TRANSACTION_LEADER') {
                const res = await createTransactionLeader(data.transactionPoint, body)
            } else if (data.type === "TRANSACTION_STAFF") {
                const res = await createTransactionStaff(data.transactionPoint, body)
            }
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <ThemeProvider theme={theme}>
            <div>
                <Navbar/>
                <div class="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" class="drawer-toggle"/>
                    <div class="drawer-content flex flex-col items-left">
                        <div class='m-10'>
                            <Typography variant='h4' fontWeight={700}>
                                Tạo tài khoản cho điểm giao dịch
                            </Typography>
                            <CreateTransactionAccountForm/>
                        </div>
                    </div>
                    <Sidebar />
                </div>
            </div>
        </ThemeProvider>
    );
};

export default CreateTransactionAccount;
