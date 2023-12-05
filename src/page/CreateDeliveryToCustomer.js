import React, { useState } from 'react';
import { TextField, Autocomplete, Button, Container, Typography } from '@mui/material';

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
    );
};

export default CreateDeliveryToCustomer;
