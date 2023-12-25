import React, { useState } from 'react';
import { TextField, Autocomplete, Button, Container, Typography } from '@mui/material';
import Navbar from '../../component/layout/Navbar';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
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
        <div>
            <Navbar />
            <div class="drawer lg:drawer-open">

                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col items-left">
                    <div>
                        <Container maxWidth="sm">
                            <Typography variant="h4" gutterBottom>
                                Create Delivery to Customer
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <Autocomplete
                                    options={orders}
                                    getOptionLabel={(option) => option.name}
                                    onChange={handleOrderChange}
                                    renderInput={(params) => <TextField {...params} label="Order ID" />}
                                />

                                <TextField
                                    label="Transaction Endpoint"
                                    fullWidth
                                    value={transactionEndpoint}
                                    onChange={(e) => setTransactionEndpoint(e.target.value)}
                                />

                                <TextField
                                    label="Address"
                                    fullWidth
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />

                                <Autocomplete
                                    options={shippers}
                                    getOptionLabel={(option) => option.name}
                                    onChange={handleShipperChange}
                                    renderInput={(params) => <TextField {...params} label="Shipper ID" />}
                                />

                                <Typography variant="h6" gutterBottom>
                                    Order Information:
                                </Typography>
                                <Typography>{`Order Name: ${orderName}`}</Typography>
                                <Typography>{`Customer: ${customerName}`}</Typography>

                                <Typography variant="h6" gutterBottom>
                                    Shipper Information:
                                </Typography>
                                <Typography>{shipperInfo}</Typography>

                                <Button type="submit" variant="contained" color="primary">
                                    Create Delivery
                                </Button>
                            </form>
                        </Container>
                    </div>
                    {/* <!-- Page content here --> */}

                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                        {/* <!-- Sidebar content here --> */}
                        <li><a href='/dashbroad/transaction'><SpaceDashboardIcon />Bảng điều khiển</a></li>
                        <li><a href='/createAccount'><PersonAddIcon />Cấp tài khoản</a></li>
                        <li><a href="/profile"><AccountCircleIcon />Cá nhân</a></li>
                        <li><a class="bg-neutral text-primary" href='#'><AddIcon/>Tạo đơn hàng đến người nhận</a></li>
                    </ul>

                </div>

            </div>

        </div>
    );
};

export default CreateDeliveryToCustomer;
