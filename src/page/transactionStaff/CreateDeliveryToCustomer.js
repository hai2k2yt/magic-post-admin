import React, { useState } from 'react';
import { TextField, Autocomplete, Button, Container, Typography } from '@mui/material';
import Navbar from '../../component/layout/Navbar';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import CheckIcon from '@mui/icons-material/Check';
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
const CreateDeliveryToCustomer = () => {
    const [orderId, setOrderId] = useState('');
    const [transactionEndpoint, setTransactionEndpoint] = useState('');
    const [address, setAddress] = useState('');
    const [shipperId, setShipperId] = useState('');
    const [orderName, setOrderName] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [shipperInfo, setShipperInfo] = useState('');

    // Mock data for orders, customers, and shippers
    const orders = [
        { id: '1', name: 'Order 1', customer: 'Customer A' },
        { id: '2', name: 'Order 2', customer: 'Customer B' },
        // Add more orders as needed
    ];

    const customers = [
        { id: '1', name: 'Customer A' },
        { id: '2', name: 'Customer B' },
        // Add more customers as needed
    ];

    const shippers = [
        { id: '1', name: 'Shipper 1', phone: '123-456-7890' },
        { id: '2', name: 'Shipper 2', phone: '987-654-3210' },
        // Add more shippers as needed
    ];

    const handleOrderChange = (event, value) => {
        if (value) {
            setOrderName(value.name);
            setCustomerName(value.customer);
        } else {
            setOrderName('');
            setCustomerName('');
        }
    };

    const handleShipperChange = (event, value) => {
        if (value) {
            setShipperInfo(`Name: ${value.name}, Phone: ${value.phone}`);
        } else {
            setShipperInfo('');
        }
    };

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Form submitted');
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Navbar />
                <div class="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                    <div class="drawer-content flex flex-col items-left">
                        <div class='m-10'>
                            <Container sx={{ width: '75%' }}>
                                <Typography variant="h4" marginBottom={5} fontWeight={700} gutterBottom>
                                    Tạo đơn gửi đến người nhận
                                </Typography>

                                <form onSubmit={handleSubmit}>
                                    <div class='mb-5'>
                                        <Autocomplete
                                            options={orders}
                                            getOptionLabel={(option) => option.name}
                                            onChange={handleOrderChange}
                                            renderInput={(params) => <TextField {...params} label="Mã đơn hàng" />}
                                        />
                                    </div>
                                    <div class='mb-5'>
                                        <TextField
                                            label="Điểm tập kết đích"
                                            fullWidth
                                            value={transactionEndpoint}
                                            onChange={(e) => setTransactionEndpoint(e.target.value)}
                                        />
                                    </div>
                                    <div class='mb-5'>
                                        <TextField
                                            label="Địa chỉ"
                                            fullWidth
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <div class='mb-5'>
                                        <Autocomplete
                                            options={shippers}
                                            getOptionLabel={(option) => option.name}
                                            onChange={handleShipperChange}
                                            renderInput={(params) => <TextField {...params} label="Mã nhân viên vận chuyển" />}
                                        />
                                    </div>
                                    <div class=''>
                                        <Typography variant="h6" gutterBottom>
                                            Thông tin đơn hàng:
                                        </Typography>
                                        <Typography sx={{ whiteSpace: "pre-wrap" }}>
                                            {`Mã đơn hàng: ${orderName}`} {'\n'}
                                            {`Tên khách hàng: ${customerName}`}</Typography>
                                        <Typography variant="h6" gutterBottom>
                                            Thông tin nhân viên vận chuyển:
                                        </Typography>
                                        <Typography>{shipperInfo}</Typography>
                                    </div>
                                    <div class='mt-5'>
                                        <Button type="submit" variant="contained" color="primary">
                                            Tạo đơn hàng
                                        </Button>
                                    </div>
                                </form>
                            </Container>
                        </div>
                    </div>
                    <div class="drawer-side">
                        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                        <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                            {/* <!-- Sidebar content here --> */}
                            <li><a href='/dashbroad/transaction'><SpaceDashboardIcon />Bảng điều khiển</a></li>
                            <li><a href='/order/create'><AddCircleOutlineIcon />Ghi nhận hàng</a></li>
                            {/* <li><a href='/order/create'><SwapHorizIcon />Đơn mới</a></li> */}
                            <li><a href='/order/delivery/gathering'><AddIcon />Tạo đơn hàng đến điểm tập kết</a></li>
                            <li><a class="bg-neutral text-primary" href='/order/delivery/customer' ><DeliveryDiningIcon/>Chuyển hàng đến người nhận</a></li>
                            <li><a href='/transaction/order'> <CheckIcon/> Xác nhận trạng thái đơn hàng</a></li>
                        </ul>

                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default CreateDeliveryToCustomer;
